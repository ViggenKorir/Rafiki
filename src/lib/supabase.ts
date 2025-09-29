import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing required Supabase environment variables");
}

// Create Supabase client without strict typing for now
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Create service role client for admin operations
const getAdminClient = () => {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    console.warn(
      "Missing SUPABASE_SERVICE_ROLE_KEY - admin functions will not work",
    );
    return supabase; // fallback to regular client
  }
  return createClient(supabaseUrl, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};

// Simplified query helpers without complex typing
export const queries = {
  // Projects
  getProjects: async (category?: string) => {
    let query = supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (category) {
      query = query.eq("category", category);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  },

  getProjectById: async (id: string) => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  // Services
  getServices: async () => {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) throw error;
    return data || [];
  },

  // News
  getLatestNews: async (limit = 4) => {
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .order("published_date", { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  },

  // Public mutations
  submitInquiry: async (input: {
    name: string;
    email: string;
    phone?: string | null;
    message: string;
    project_type: string;
  }) => {
    const inquiryData = {
      ...input,
      status: "new" as const,
    };

    const { data, error } = await supabase
      .from("inquiries")
      .insert(inquiryData)
      .select("*")
      .single();

    if (error) throw error;
    return data;
  },

  // Admin mutations (simplified)
  admin: {
    updateProject: async (id: string, updates: Record<string, any>) => {
      const client = getAdminClient();
      const { data, error } = await client
        .from("projects")
        .update(updates)
        .eq("id", id)
        .select("*")
        .single();

      if (error) throw error;
      return data;
    },

    updateInquiryStatus: async (id: string, status: string) => {
      const client = getAdminClient();
      const { data, error } = await client
        .from("inquiries")
        .update({ status })
        .eq("id", id)
        .select("*")
        .single();

      if (error) throw error;
      return data;
    },

    getAllInquiries: async () => {
      const client = getAdminClient();
      const { data, error } = await client
        .from("inquiries")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    },
  },
};
