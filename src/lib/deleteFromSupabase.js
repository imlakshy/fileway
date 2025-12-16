import { supabase } from "@/lib/supabaseClient"; // or wherever your client is located

export async function deleteFromSupabase({ urls }) {
  const bucket = "fileway"; // update this to your actual bucket

  const base = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/`;

  const paths = urls.map((url) => url.replace(base, ""));

  // const { data, error } = await supabase.storage.from(bucket).remove(paths);

  // if (error) {
  //   console.error("❌ Error deleting files from Supabase:", error.message);
  // } else {
  //   console.log("Files deleted successfully ✅:", data);
  // }
}
