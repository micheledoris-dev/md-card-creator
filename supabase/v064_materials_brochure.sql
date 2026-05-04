-- md|studios Card Creator — V0.6.4
-- Materiali / Brochure

alter table public.cards
add column if not exists materials jsonb default '[]'::jsonb;

insert into storage.buckets (id, name, public)
values ('card-materials', 'card-materials', true)
on conflict (id) do nothing;

drop policy if exists "Public can view card materials" on storage.objects;
create policy "Public can view card materials"
on storage.objects
for select
using (bucket_id = 'card-materials');

drop policy if exists "Users can upload own card materials" on storage.objects;
create policy "Users can upload own card materials"
on storage.objects
for insert
with check (
  bucket_id = 'card-materials'
  and auth.uid()::text = (storage.foldername(name))[1]
);

drop policy if exists "Users can update own card materials" on storage.objects;
create policy "Users can update own card materials"
on storage.objects
for update
using (
  bucket_id = 'card-materials'
  and auth.uid()::text = (storage.foldername(name))[1]
);

drop policy if exists "Users can delete own card materials" on storage.objects;
create policy "Users can delete own card materials"
on storage.objects
for delete
using (
  bucket_id = 'card-materials'
  and auth.uid()::text = (storage.foldername(name))[1]
);
