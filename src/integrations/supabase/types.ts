export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      feed_inventory: {
        Row: {
          category: string
          cost: string | null
          created_at: string | null
          id: string
          last_purchase: string | null
          name: string
          quantity_available: string
          status: string
          supplier: string | null
          unit: string | null
          updated_at: string | null
        }
        Insert: {
          category: string
          cost?: string | null
          created_at?: string | null
          id: string
          last_purchase?: string | null
          name: string
          quantity_available: string
          status: string
          supplier?: string | null
          unit?: string | null
          updated_at?: string | null
        }
        Update: {
          category?: string
          cost?: string | null
          created_at?: string | null
          id?: string
          last_purchase?: string | null
          name?: string
          quantity_available?: string
          status?: string
          supplier?: string | null
          unit?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      feeding_schedules: {
        Row: {
          animal_group: string
          assignee: string | null
          created_at: string | null
          feed_type: string
          frequency: string
          id: string
          name: string
          quantity: string
          status: string
          time: string
          updated_at: string | null
        }
        Insert: {
          animal_group: string
          assignee?: string | null
          created_at?: string | null
          feed_type: string
          frequency: string
          id: string
          name: string
          quantity: string
          status: string
          time: string
          updated_at?: string | null
        }
        Update: {
          animal_group?: string
          assignee?: string | null
          created_at?: string | null
          feed_type?: string
          frequency?: string
          id?: string
          name?: string
          quantity?: string
          status?: string
          time?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      financial_transactions: {
        Row: {
          amount: number
          category: string
          created_at: string | null
          date: string
          description: string
          id: string
          payment_method: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          amount: number
          category: string
          created_at?: string | null
          date: string
          description: string
          id: string
          payment_method?: string | null
          status: string
          updated_at?: string | null
        }
        Update: {
          amount?: number
          category?: string
          created_at?: string | null
          date?: string
          description?: string
          id?: string
          payment_method?: string | null
          status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      health_records: {
        Row: {
          animal_id: string
          animal_name: string
          created_at: string | null
          date: string
          description: string | null
          id: string
          performed_by: string | null
          type: string
          updated_at: string | null
        }
        Insert: {
          animal_id: string
          animal_name: string
          created_at?: string | null
          date: string
          description?: string | null
          id: string
          performed_by?: string | null
          type: string
          updated_at?: string | null
        }
        Update: {
          animal_id?: string
          animal_name?: string
          created_at?: string | null
          date?: string
          description?: string | null
          id?: string
          performed_by?: string | null
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "health_records_animal_id_fkey"
            columns: ["animal_id"]
            isOneToOne: false
            referencedRelation: "livestock"
            referencedColumns: ["id"]
          },
        ]
      }
      livestock: {
        Row: {
          age: string | null
          birth_date: string | null
          breed: string
          created_at: string | null
          gender: string
          health_status: string
          id: string
          image_url: string | null
          name: string
          notes: string | null
          purchase_date: string | null
          purchase_price: string | null
          updated_at: string | null
          weight: string | null
        }
        Insert: {
          age?: string | null
          birth_date?: string | null
          breed: string
          created_at?: string | null
          gender: string
          health_status: string
          id: string
          image_url?: string | null
          name: string
          notes?: string | null
          purchase_date?: string | null
          purchase_price?: string | null
          updated_at?: string | null
          weight?: string | null
        }
        Update: {
          age?: string | null
          birth_date?: string | null
          breed?: string
          created_at?: string | null
          gender?: string
          health_status?: string
          id?: string
          image_url?: string | null
          name?: string
          notes?: string | null
          purchase_date?: string | null
          purchase_price?: string | null
          updated_at?: string | null
          weight?: string | null
        }
        Relationships: []
      }
      tasks: {
        Row: {
          assignee: string | null
          category: string
          completed: boolean
          created_at: string | null
          description: string | null
          due_date: string
          id: string
          priority: string
          title: string
          updated_at: string | null
        }
        Insert: {
          assignee?: string | null
          category: string
          completed?: boolean
          created_at?: string | null
          description?: string | null
          due_date: string
          id: string
          priority: string
          title: string
          updated_at?: string | null
        }
        Update: {
          assignee?: string | null
          category?: string
          completed?: boolean
          created_at?: string | null
          description?: string | null
          due_date?: string
          id?: string
          priority?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      vaccination_schedules: {
        Row: {
          animal_count: number
          animal_ids: string[]
          created_at: string | null
          due_date: string
          id: string
          status: string
          updated_at: string | null
          vaccine_name: string
        }
        Insert: {
          animal_count: number
          animal_ids: string[]
          created_at?: string | null
          due_date: string
          id: string
          status: string
          updated_at?: string | null
          vaccine_name: string
        }
        Update: {
          animal_count?: number
          animal_ids?: string[]
          created_at?: string | null
          due_date?: string
          id?: string
          status?: string
          updated_at?: string | null
          vaccine_name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
