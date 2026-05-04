-- md|studios Card Creator — V0.6.0
-- Media Identity: foto profilo + logo aziendale

alter table public.cards
add column if not exists profile_photo_url text;

alter table public.cards
add column if not exists company_logo_url text;

-- Bucket pubblico per media card
insert into storage.buckets (id, name, public)
values ('card-media', 'card-media', true)
on conflict (id) do nothing;

-- Policy storage: lettura pubblica
drop policy if exists "Public can view card media" on storage.objects;
create policy "Public can view card media"
on storage.objects
for select
using (bucket_id = 'card-media');

-- Policy storage: upload da utente autenticato nella propria cartella
drop policy if exists "Users can upload own card media" on storage.objects;
create policy "Users can upload own card media"
on storage.objects
for insert
with check (
  bucket_id = 'card-media'
  and auth.uid()::text = (storage.foldername(name))[1]
);

-- Policy storage: update da utente autenticato nella propria cartella
drop policy if exists "Users can update own card media" on storage.objects;
create policy "Users can update own card media"
on storage.objects
for update
using (
  bucket_id = 'card-media'
  and auth.uid()::text = (storage.foldername(name))[1]
);

-- Policy storage: delete da utente autenticato nella propria cartella
drop policy if exists "Users can delete own card media" on storage.objects;
create policy "Users can delete own card media"
on storage.objects
for delete
using (
  bucket_id = 'card-media'
  and auth.uid()::text = (storage.foldername(name))[1]
);
