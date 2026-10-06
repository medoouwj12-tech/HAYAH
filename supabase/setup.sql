-- HAYAH FLOWERS product catalog and access rules.
-- Run in Supabase SQL Editor, then create an Auth user and add their UUID below.

create table if not exists public.products (
  id text primary key,
  image text not null,
  category text not null,
  price numeric(10,2) not null check (price >= 0),
  original_price numeric(10,2) not null check (original_price >= 0),
  rating numeric(2,1) not null default 5 check (rating >= 0 and rating <= 5),
  reviews_count integer not null default 0 check (reviews_count >= 0),
  badge jsonb not null default '{"en":"New","ar":"جديد"}'::jsonb,
  name jsonb not null default '{}'::jsonb,
  description jsonb not null default '{}'::jsonb,
  flowers jsonb not null default '{}'::jsonb,
  care jsonb not null default '{}'::jsonb,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.products enable row level security;
alter table public.admin_users enable row level security;

drop policy if exists "Anyone can read published products" on public.products;
create policy "Anyone can read published products"
on public.products for select to anon, authenticated
using (
  is_active
  or exists (select 1 from public.admin_users where user_id = auth.uid())
);

drop policy if exists "Admins can insert products" on public.products;
create policy "Admins can insert products"
on public.products for insert to authenticated
with check (exists (select 1 from public.admin_users where user_id = auth.uid()));

drop policy if exists "Admins can update products" on public.products;
create policy "Admins can update products"
on public.products for update to authenticated
using (exists (select 1 from public.admin_users where user_id = auth.uid()))
with check (exists (select 1 from public.admin_users where user_id = auth.uid()));

drop policy if exists "Admins can delete products" on public.products;
create policy "Admins can delete products"
on public.products for delete to authenticated
using (exists (select 1 from public.admin_users where user_id = auth.uid()));

drop policy if exists "Admins can read their own access row" on public.admin_users;
create policy "Admins can read their own access row"
on public.admin_users for select to authenticated
using (user_id = auth.uid());

-- Make a public bucket so storefront product images can load without a session.
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do update set public = true;

drop policy if exists "Public can view product images" on storage.objects;
create policy "Public can view product images"
on storage.objects for select to anon, authenticated
using (bucket_id = 'product-images');

drop policy if exists "Admins can upload product images" on storage.objects;
create policy "Admins can upload product images"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'product-images'
  and exists (select 1 from public.admin_users where user_id = auth.uid())
);

drop policy if exists "Admins can update product images" on storage.objects;
create policy "Admins can update product images"
on storage.objects for update to authenticated
using (
  bucket_id = 'product-images'
  and exists (select 1 from public.admin_users where user_id = auth.uid())
)
with check (
  bucket_id = 'product-images'
  and exists (select 1 from public.admin_users where user_id = auth.uid())
);

drop policy if exists "Admins can delete product images" on storage.objects;
create policy "Admins can delete product images"
on storage.objects for delete to authenticated
using (
  bucket_id = 'product-images'
  and exists (select 1 from public.admin_users where user_id = auth.uid())
);

-- After creating an Auth user in Supabase, grant admin access by email (no UUID copying):
--   select public.add_admin_by_email('owner@example.com');
create or replace function public.add_admin_by_email(p_email text)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user uuid;
begin
  select id into v_user from auth.users where lower(email) = lower(trim(p_email));
  if v_user is null then
    raise exception 'No Supabase Auth user found for %. Create the user in Authentication > Users first.', p_email;
  end if;
  insert into public.admin_users (user_id) values (v_user)
  on conflict (user_id) do nothing;
  return v_user;
end;
$$;

revoke execute on function public.add_admin_by_email(text) from public, anon, authenticated;
grant execute on function public.add_admin_by_email(text) to postgres, service_role;
