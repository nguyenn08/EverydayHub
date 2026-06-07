-- ============================================================
-- EverydayHub V1 — Initial Schema
-- Category: Barbers / Hair only
-- ============================================================

-- DROP EXISTING OBJECTS (safe to re-run)
DROP TABLE IF EXISTS public.business_members       CASCADE;
DROP TABLE IF EXISTS public.waitlist               CASCADE;
DROP TABLE IF EXISTS public.appointments           CASCADE;
DROP TABLE IF EXISTS public.availability_exceptions CASCADE;
DROP TABLE IF EXISTS public.availability_schedules CASCADE;
DROP TABLE IF EXISTS public.staff_services         CASCADE;
DROP TABLE IF EXISTS public.services               CASCADE;
DROP TABLE IF EXISTS public.staff                  CASCADE;
DROP TABLE IF EXISTS public.businesses             CASCADE;
DROP TABLE IF EXISTS public.users                  CASCADE;

DROP FUNCTION IF EXISTS handle_new_auth_user()     CASCADE;
DROP FUNCTION IF EXISTS is_business_owner(UUID)    CASCADE;
DROP FUNCTION IF EXISTS is_business_member(UUID)   CASCADE;
DROP FUNCTION IF EXISTS set_updated_at()           CASCADE;

DROP TYPE IF EXISTS waitlist_status    CASCADE;
DROP TYPE IF EXISTS exception_type     CASCADE;
DROP TYPE IF EXISTS day_of_week        CASCADE;
DROP TYPE IF EXISTS appointment_status CASCADE;
DROP TYPE IF EXISTS service_category   CASCADE;
DROP TYPE IF EXISTS user_role          CASCADE;

-- ENUMS
CREATE TYPE user_role AS ENUM ('consumer', 'business_owner', 'staff', 'admin');
CREATE TYPE appointment_status AS ENUM ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show');
CREATE TYPE day_of_week AS ENUM ('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday');
CREATE TYPE exception_type AS ENUM ('day_off', 'modified_hours', 'extra_hours');
CREATE TYPE waitlist_status AS ENUM ('waiting', 'notified', 'booked', 'expired', 'cancelled');
CREATE TYPE service_category AS ENUM ('haircut', 'beard_trim', 'shave', 'hair_color', 'hair_treatment', 'kids_cut', 'other');

-- ============================================================
-- UPDATED_AT TRIGGER FUNCTION
-- ============================================================
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- ============================================================
-- USERS
-- ============================================================
CREATE TABLE public.users (
  id                UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role              user_role NOT NULL DEFAULT 'consumer',
  full_name         TEXT NOT NULL,
  display_name      TEXT,
  phone             TEXT,
  avatar_url        TEXT,
  timezone          TEXT NOT NULL DEFAULT 'America/Chicago',
  is_active         BOOLEAN NOT NULL DEFAULT TRUE,
  onboarding_done   BOOLEAN NOT NULL DEFAULT FALSE,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_role ON public.users(role);

CREATE TRIGGER trg_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ============================================================
-- BUSINESSES
-- ============================================================
CREATE TABLE public.businesses (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id              UUID NOT NULL REFERENCES public.users(id) ON DELETE RESTRICT,
  name                  TEXT NOT NULL,
  slug                  TEXT NOT NULL UNIQUE,
  description           TEXT,
  phone                 TEXT,
  email                 TEXT,
  website_url           TEXT,
  instagram_handle      TEXT,
  address_line1         TEXT,
  address_line2         TEXT,
  city                  TEXT,
  state                 VARCHAR(2),
  zip                   TEXT,
  latitude              NUMERIC(9, 6),
  longitude             NUMERIC(9, 6),
  timezone              TEXT NOT NULL DEFAULT 'America/Chicago',
  logo_url              TEXT,
  cover_url             TEXT,
  booking_buffer        INT NOT NULL DEFAULT 0,
  advance_booking_days  INT NOT NULL DEFAULT 30,
  cancellation_hours    INT NOT NULL DEFAULT 24,
  is_active             BOOLEAN NOT NULL DEFAULT TRUE,
  is_verified           BOOLEAN NOT NULL DEFAULT FALSE,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_businesses_owner ON public.businesses(owner_id);
CREATE INDEX idx_businesses_slug  ON public.businesses(slug);
CREATE INDEX idx_businesses_city  ON public.businesses(city);
CREATE INDEX idx_businesses_geo   ON public.businesses(latitude, longitude);

CREATE TRIGGER trg_businesses_updated_at
  BEFORE UPDATE ON public.businesses
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ============================================================
-- STAFF
-- ============================================================
CREATE TABLE public.staff (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id     UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  user_id         UUID REFERENCES public.users(id) ON DELETE SET NULL,
  full_name       TEXT NOT NULL,
  bio             TEXT,
  avatar_url      TEXT,
  specialties     TEXT[],
  is_active       BOOLEAN NOT NULL DEFAULT TRUE,
  display_order   INT NOT NULL DEFAULT 0,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_staff_business ON public.staff(business_id);
CREATE INDEX idx_staff_user     ON public.staff(user_id);
CREATE INDEX idx_staff_active   ON public.staff(business_id, is_active);

CREATE TRIGGER trg_staff_updated_at
  BEFORE UPDATE ON public.staff
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ============================================================
-- SERVICES
-- ============================================================
CREATE TABLE public.services (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id     UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  category        service_category NOT NULL DEFAULT 'other',
  name            TEXT NOT NULL,
  description     TEXT,
  duration_minutes INT NOT NULL CHECK (duration_minutes > 0),
  price_cents     INT,
  is_active       BOOLEAN NOT NULL DEFAULT TRUE,
  display_order   INT NOT NULL DEFAULT 0,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_services_business ON public.services(business_id);
CREATE INDEX idx_services_active   ON public.services(business_id, is_active);

CREATE TRIGGER trg_services_updated_at
  BEFORE UPDATE ON public.services
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ============================================================
-- STAFF_SERVICES
-- ============================================================
CREATE TABLE public.staff_services (
  staff_id    UUID NOT NULL REFERENCES public.staff(id) ON DELETE CASCADE,
  service_id  UUID NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
  PRIMARY KEY (staff_id, service_id)
);

CREATE INDEX idx_staff_services_service ON public.staff_services(service_id);

-- ============================================================
-- AVAILABILITY_SCHEDULES
-- ============================================================
CREATE TABLE public.availability_schedules (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  staff_id      UUID NOT NULL REFERENCES public.staff(id) ON DELETE CASCADE,
  day_of_week   day_of_week NOT NULL,
  start_time    TIME NOT NULL,
  end_time      TIME NOT NULL,
  is_active     BOOLEAN NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT chk_schedule_times CHECK (end_time > start_time)
);

CREATE INDEX idx_avail_sched_staff ON public.availability_schedules(staff_id);
CREATE INDEX idx_avail_sched_day   ON public.availability_schedules(staff_id, day_of_week);

CREATE TRIGGER trg_avail_sched_updated_at
  BEFORE UPDATE ON public.availability_schedules
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ============================================================
-- AVAILABILITY_EXCEPTIONS
-- ============================================================
CREATE TABLE public.availability_exceptions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  staff_id        UUID NOT NULL REFERENCES public.staff(id) ON DELETE CASCADE,
  exception_date  DATE NOT NULL,
  exception_type  exception_type NOT NULL,
  start_time      TIME,
  end_time        TIME,
  note            TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT chk_exception_times CHECK (
    (exception_type = 'day_off') OR (start_time IS NOT NULL AND end_time IS NOT NULL AND end_time > start_time)
  ),
  UNIQUE (staff_id, exception_date)
);

CREATE INDEX idx_avail_exc_staff ON public.availability_exceptions(staff_id);
CREATE INDEX idx_avail_exc_date  ON public.availability_exceptions(staff_id, exception_date);

CREATE TRIGGER trg_avail_exc_updated_at
  BEFORE UPDATE ON public.availability_exceptions
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ============================================================
-- APPOINTMENTS
-- ============================================================
CREATE TABLE public.appointments (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id         UUID NOT NULL REFERENCES public.businesses(id) ON DELETE RESTRICT,
  staff_id            UUID NOT NULL REFERENCES public.staff(id) ON DELETE RESTRICT,
  service_id          UUID NOT NULL REFERENCES public.services(id) ON DELETE RESTRICT,
  consumer_id         UUID NOT NULL REFERENCES public.users(id) ON DELETE RESTRICT,
  service_name        TEXT NOT NULL,
  service_duration    INT NOT NULL,
  service_price_cents INT,
  starts_at           TIMESTAMPTZ NOT NULL,
  ends_at             TIMESTAMPTZ NOT NULL,
  status              appointment_status NOT NULL DEFAULT 'pending',
  consumer_note       TEXT,
  business_note       TEXT,
  cancellation_reason TEXT,
  cancelled_by        UUID REFERENCES public.users(id),
  cancelled_at        TIMESTAMPTZ,
  confirmed_at        TIMESTAMPTZ,
  completed_at        TIMESTAMPTZ,
  reminder_24h_sent   BOOLEAN NOT NULL DEFAULT FALSE,
  reminder_1h_sent    BOOLEAN NOT NULL DEFAULT FALSE,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT chk_appointment_times CHECK (ends_at > starts_at)
);

CREATE INDEX idx_appt_business   ON public.appointments(business_id);
CREATE INDEX idx_appt_staff      ON public.appointments(staff_id);
CREATE INDEX idx_appt_consumer   ON public.appointments(consumer_id);
CREATE INDEX idx_appt_status     ON public.appointments(status);
CREATE INDEX idx_appt_starts_at  ON public.appointments(starts_at);
CREATE INDEX idx_appt_staff_time ON public.appointments(staff_id, starts_at, ends_at)
  WHERE status NOT IN ('cancelled', 'no_show');

CREATE TRIGGER trg_appointments_updated_at
  BEFORE UPDATE ON public.appointments
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ============================================================
-- WAITLIST
-- ============================================================
CREATE TABLE public.waitlist (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id     UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  staff_id        UUID REFERENCES public.staff(id) ON DELETE SET NULL,
  service_id      UUID NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
  consumer_id     UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  preferred_date  DATE NOT NULL,
  preferred_start TIME,
  preferred_end   TIME,
  status          waitlist_status NOT NULL DEFAULT 'waiting',
  notified_at     TIMESTAMPTZ,
  expires_at      TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_waitlist_business ON public.waitlist(business_id);
CREATE INDEX idx_waitlist_consumer ON public.waitlist(consumer_id);
CREATE INDEX idx_waitlist_status   ON public.waitlist(status);
CREATE INDEX idx_waitlist_date     ON public.waitlist(business_id, preferred_date)
  WHERE status = 'waiting';

CREATE TRIGGER trg_waitlist_updated_at
  BEFORE UPDATE ON public.waitlist
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ============================================================
-- BUSINESS_MEMBERS
-- ============================================================
CREATE TABLE public.business_members (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id  UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  user_id      UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  staff_id     UUID REFERENCES public.staff(id) ON DELETE SET NULL,
  is_manager   BOOLEAN NOT NULL DEFAULT FALSE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (business_id, user_id)
);

CREATE INDEX idx_biz_members_business ON public.business_members(business_id);
CREATE INDEX idx_biz_members_user     ON public.business_members(user_id);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE public.users                   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.businesses              ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.staff                   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services                ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.staff_services          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.availability_schedules  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.availability_exceptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.waitlist                ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_members        ENABLE ROW LEVEL SECURITY;

-- Helper functions
CREATE OR REPLACE FUNCTION is_business_member(biz_id UUID)
RETURNS BOOLEAN LANGUAGE sql SECURITY DEFINER STABLE AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.business_members
    WHERE business_id = biz_id AND user_id = auth.uid()
  );
$$;

CREATE OR REPLACE FUNCTION is_business_owner(biz_id UUID)
RETURNS BOOLEAN LANGUAGE sql SECURITY DEFINER STABLE AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.businesses
    WHERE id = biz_id AND owner_id = auth.uid()
  );
$$;

-- Users policies
CREATE POLICY "users_select_own"              ON public.users FOR SELECT USING (id = auth.uid());
CREATE POLICY "users_insert_own"              ON public.users FOR INSERT WITH CHECK (id = auth.uid());
CREATE POLICY "users_update_own"              ON public.users FOR UPDATE USING (id = auth.uid()) WITH CHECK (id = auth.uid());
CREATE POLICY "users_select_consumer_by_biz"  ON public.users FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.appointments a
    JOIN public.business_members bm ON bm.business_id = a.business_id
    WHERE a.consumer_id = users.id AND bm.user_id = auth.uid()
  )
);

-- Businesses policies
CREATE POLICY "businesses_select_public"  ON public.businesses FOR SELECT USING (is_active = TRUE);
CREATE POLICY "businesses_insert_auth"    ON public.businesses FOR INSERT WITH CHECK (owner_id = auth.uid());
CREATE POLICY "businesses_update_owner"   ON public.businesses FOR UPDATE USING (owner_id = auth.uid()) WITH CHECK (owner_id = auth.uid());
CREATE POLICY "businesses_delete_owner"   ON public.businesses FOR DELETE USING (owner_id = auth.uid());

-- Staff policies
CREATE POLICY "staff_select_public"   ON public.staff FOR SELECT USING (is_active = TRUE);
CREATE POLICY "staff_insert_member"   ON public.staff FOR INSERT WITH CHECK (is_business_member(business_id));
CREATE POLICY "staff_update_member"   ON public.staff FOR UPDATE USING (is_business_member(business_id)) WITH CHECK (is_business_member(business_id));
CREATE POLICY "staff_delete_owner"    ON public.staff FOR DELETE USING (is_business_owner(business_id));

-- Services policies
CREATE POLICY "services_select_public"  ON public.services FOR SELECT USING (is_active = TRUE);
CREATE POLICY "services_insert_member"  ON public.services FOR INSERT WITH CHECK (is_business_member(business_id));
CREATE POLICY "services_update_member"  ON public.services FOR UPDATE USING (is_business_member(business_id)) WITH CHECK (is_business_member(business_id));
CREATE POLICY "services_delete_owner"   ON public.services FOR DELETE USING (is_business_owner(business_id));

-- Staff services policies
CREATE POLICY "staff_services_select_public" ON public.staff_services FOR SELECT USING (TRUE);
CREATE POLICY "staff_services_write_member"  ON public.staff_services FOR ALL USING (
  EXISTS (SELECT 1 FROM public.staff s WHERE s.id = staff_id AND is_business_member(s.business_id))
);

-- Availability policies
CREATE POLICY "avail_sched_select_public" ON public.availability_schedules FOR SELECT USING (TRUE);
CREATE POLICY "avail_sched_write_member"  ON public.availability_schedules FOR ALL USING (
  EXISTS (SELECT 1 FROM public.staff s WHERE s.id = staff_id AND is_business_member(s.business_id))
);

CREATE POLICY "avail_exc_select_public"   ON public.availability_exceptions FOR SELECT USING (TRUE);
CREATE POLICY "avail_exc_write_member"    ON public.availability_exceptions FOR ALL USING (
  EXISTS (SELECT 1 FROM public.staff s WHERE s.id = staff_id AND is_business_member(s.business_id))
);

-- Appointments policies
CREATE POLICY "appt_select_consumer"  ON public.appointments FOR SELECT USING (consumer_id = auth.uid());
CREATE POLICY "appt_select_business"  ON public.appointments FOR SELECT USING (is_business_member(business_id));
CREATE POLICY "appt_insert_consumer"  ON public.appointments FOR INSERT WITH CHECK (consumer_id = auth.uid());
CREATE POLICY "appt_update_consumer"  ON public.appointments FOR UPDATE USING (consumer_id = auth.uid()) WITH CHECK (consumer_id = auth.uid());
CREATE POLICY "appt_update_business"  ON public.appointments FOR UPDATE USING (is_business_member(business_id)) WITH CHECK (is_business_member(business_id));

-- Waitlist policies
CREATE POLICY "waitlist_select_consumer"  ON public.waitlist FOR SELECT USING (consumer_id = auth.uid());
CREATE POLICY "waitlist_insert_consumer"  ON public.waitlist FOR INSERT WITH CHECK (consumer_id = auth.uid());
CREATE POLICY "waitlist_update_consumer"  ON public.waitlist FOR UPDATE USING (consumer_id = auth.uid()) WITH CHECK (consumer_id = auth.uid());
CREATE POLICY "waitlist_select_business"  ON public.waitlist FOR SELECT USING (is_business_member(business_id));
CREATE POLICY "waitlist_update_business"  ON public.waitlist FOR UPDATE USING (is_business_member(business_id)) WITH CHECK (is_business_member(business_id));

-- Business members policies
CREATE POLICY "biz_members_select_member" ON public.business_members FOR SELECT USING (is_business_member(business_id));
CREATE POLICY "biz_members_write_owner"   ON public.business_members FOR ALL USING (is_business_owner(business_id));

-- ============================================================
-- AUTH TRIGGER — auto-create user profile on signup
-- ============================================================
CREATE OR REPLACE FUNCTION handle_new_auth_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.users (id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    'consumer'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_auth_user();
