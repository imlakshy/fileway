import React from 'react'
import { supabase } from '@/lib/supabaseClient';


const uploadToSupabase = async ({ selectedFiles }) => {
  const urls = [];

  for (const f of selectedFiles) {
    const file = f?.file

    const filePath = `uploads/${file.name}`;

    await supabase.storage.from("fileway").upload(filePath, file, { cacheControl: "3600", upsert: true, });

    const publicUrl = supabase.storage
      .from('fileway')
      .getPublicUrl(filePath).data.publicUrl;
      
    urls.push(publicUrl)
    
  }

  return urls

}


export default uploadToSupabase