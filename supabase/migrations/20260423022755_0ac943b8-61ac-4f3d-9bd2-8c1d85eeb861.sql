UPDATE public.releases
SET title = replace(replace(replace(replace(replace(title, '&amp;', '&'), '&#39;', ''''), '&quot;', '"'), '&lt;', '<'), '&gt;', '>')
WHERE title ~ '&(amp|#39|quot|lt|gt);';