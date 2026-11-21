-- Create a PRIVATE bucket named `personal-data` in Supabase Storage first.
-- Replace the UUID below with the owner's auth.users.id before running.
-- This permits the owner to read files, but does not permit browser writes.
create policy "Owner can read personal data files"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'personal-data'
  and auth.uid() = 'REPLACE-WITH-OWNER-USER-UUID'::uuid
);
