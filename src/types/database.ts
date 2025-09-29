export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          category: "residential" | "commercial";
          images: string[];
          completion_date: string | null;
          client_name: string | null;
          location: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          title: string;
          description?: string | null;
          category: "residential" | "commercial";
          images: string[];
          completion_date?: string | null;
          client_name?: string | null;
          location?: string | null;
        };
        Update: {
          title?: string;
          description?: string | null;
          category?: "residential" | "commercial";
          images?: string[];
          completion_date?: string | null;
          client_name?: string | null;
          location?: string | null;
        };
      };
      services: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          icon: string;
          price_range: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          name: string;
          description?: string | null;
          icon: string;
          price_range?: string | null;
        };
        Update: {
          name?: string;
          description?: string | null;
          icon?: string;
          price_range?: string | null;
        };
      };
      inquiries: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          message: string;
          project_type: string;
          status: "new" | "contacted" | "closed";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          name: string;
          email: string;
          phone?: string | null;
          message: string;
          project_type: string;
          status?: "new" | "contacted" | "closed";
        };
        Update: {
          name?: string;
          email?: string;
          phone?: string | null;
          message?: string;
          project_type?: string;
          status?: "new" | "contacted" | "closed";
        };
      };
      news: {
        Row: {
          id: string;
          title: string;
          content: string | null;
          excerpt: string | null;
          image: string | null;
          published_date: string;
          author: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          title: string;
          content?: string | null;
          excerpt?: string | null;
          image?: string | null;
          published_date: string;
          author: string;
        };
        Update: {
          title?: string;
          content?: string | null;
          excerpt?: string | null;
          image?: string | null;
          published_date?: string;
          author?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

// Helper types
export type Tables = Database["public"]["Tables"];
export type TableRow<T extends keyof Tables> = Tables[T]["Row"];
export type TableInsert<T extends keyof Tables> = Tables[T]["Insert"];
export type TableUpdate<T extends keyof Tables> = Tables[T]["Update"];
