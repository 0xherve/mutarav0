
-- Create tables
CREATE TABLE IF NOT EXISTS livestock (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  breed TEXT NOT NULL,
  gender TEXT NOT NULL,
  age TEXT,
  weight TEXT,
  health_status TEXT NOT NULL,
  image_url TEXT,
  birth_date TEXT,
  purchase_date TEXT,
  purchase_price TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS health_records (
  id TEXT PRIMARY KEY,
  animal_id TEXT NOT NULL REFERENCES livestock(id) ON DELETE CASCADE,
  animal_name TEXT NOT NULL,
  type TEXT NOT NULL,
  date TEXT NOT NULL,
  description TEXT,
  performed_by TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS vaccination_schedules (
  id TEXT PRIMARY KEY,
  animal_ids TEXT[] NOT NULL,
  animal_count INTEGER NOT NULL,
  vaccine_name TEXT NOT NULL,
  due_date TEXT NOT NULL,
  status TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS feeding_schedules (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  feed_type TEXT NOT NULL,
  animal_group TEXT NOT NULL,
  quantity TEXT NOT NULL,
  time TEXT NOT NULL,
  frequency TEXT NOT NULL,
  assignee TEXT,
  status TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS feed_inventory (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  quantity_available TEXT NOT NULL,
  unit TEXT,
  last_purchase TEXT,
  supplier TEXT,
  cost TEXT,
  status TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tasks (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  due_date TEXT NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  priority TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS financial_transactions (
  id TEXT PRIMARY KEY,
  date TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  amount DECIMAL NOT NULL,
  payment_method TEXT,
  status TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample livestock data
INSERT INTO livestock (id, name, breed, gender, age, weight, health_status, image_url, birth_date, purchase_date, purchase_price, notes)
VALUES
  ('LV1001', 'Bella', 'Angus', 'Female', '3 years', '550 kg', 'healthy', 'https://images.unsplash.com/photo-1584935496024-506443d6f664?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', '2021-03-15', '2021-06-20', '$1,200', 'Excellent milk producer. First calf born in spring 2023.'),
  ('LV1002', 'Duke', 'Hereford', 'Male', '4 years', '850 kg', 'healthy', 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', '2020-02-10', '2020-05-15', '$1,500', 'Primary breeding bull. Excellent genetics.'),
  ('LV1003', 'Daisy', 'Holstein', 'Female', '2 years', '450 kg', 'attention', 'https://images.unsplash.com/photo-1545468258-95573b2a901f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', '2022-05-22', '2022-08-10', '$900', 'Recently showing signs of reduced appetite. Under observation.'),
  ('LV1004', 'Rocky', 'Brahman', 'Male', '5 years', '920 kg', 'healthy', 'https://images.unsplash.com/photo-1527152440941-d93afd8e1eda?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', '2019-01-05', '2019-06-30', '$1,800', 'Secondary breeding bull. Heat-resistant.'),
  ('LV1005', 'Rosie', 'Jersey', 'Female', '3 years', '420 kg', 'sick', 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', '2021-07-12', '2021-10-05', '$950', 'Currently on antibiotics for respiratory infection.'),
  ('LV1006', 'Bruno', 'Charolais', 'Male', '2 years', '680 kg', 'healthy', 'https://images.unsplash.com/photo-1511374322434-82c9c47d07da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', '2022-02-18', '2022-05-30', '$1,350', 'Fast growing. Potential for beef production.');

-- Insert sample health records
INSERT INTO health_records (id, animal_id, animal_name, type, date, description, performed_by)
VALUES
  ('HR001', 'LV1001', 'Bella', 'Vaccination', '2023-10-15', 'Annual vaccination against blackleg', 'Dr. Smith'),
  ('HR002', 'LV1003', 'Daisy', 'Treatment', '2023-11-02', 'Treatment for mild respiratory infection', 'Dr. Johnson'),
  ('HR003', 'LV1005', 'Rosie', 'Examination', '2023-11-10', 'General health examination, signs of fatigue', 'Dr. Martinez'),
  ('HR004', 'LV1002', 'Duke', 'Vaccination', '2023-09-28', 'Vaccination against BVD', 'Dr. Smith');

-- Insert sample vaccination schedules
INSERT INTO vaccination_schedules (id, animal_ids, animal_count, vaccine_name, due_date, status)
VALUES
  ('VS001', ARRAY['LV1001', 'LV1004', 'LV1006'], 3, 'Blackleg Vaccine', '2023-12-15', 'upcoming'),
  ('VS002', ARRAY['LV1002', 'LV1003'], 2, 'BVD Vaccine', '2023-12-10', 'upcoming'),
  ('VS003', ARRAY['LV1005'], 1, 'Respiratory Vaccine', '2023-11-05', 'overdue');

-- Insert sample feeding schedules
INSERT INTO feeding_schedules (id, name, feed_type, animal_group, quantity, time, frequency, assignee, status)
VALUES
  ('FS001', 'Morning Feed - Dairy Group', 'Hay and Grain Mix', 'Dairy Cows', '250 kg', '06:00 AM', 'Daily', 'John Smith', 'active'),
  ('FS002', 'Evening Feed - Dairy Group', 'Silage and Mineral Supplement', 'Dairy Cows', '200 kg', '05:00 PM', 'Daily', 'Maria Rodriguez', 'active'),
  ('FS003', 'Morning Feed - Beef Group', 'Grain and Protein Mix', 'Beef Cattle', '180 kg', '07:00 AM', 'Daily', 'Michael Johnson', 'active'),
  ('FS004', 'Special Supplement - Calves', 'Calf Starter and Milk Replacer', 'Calves', '50 kg', '08:00 AM', 'Daily', 'Sarah Williams', 'active'),
  ('FS005', 'Winter Feed Program', 'High-Energy Feed Mix', 'All Cattle', '300 kg', 'Various', 'Seasonal', 'David Wilson', 'inactive');

-- Insert sample feed inventory
INSERT INTO feed_inventory (id, name, category, quantity_available, unit, last_purchase, supplier, cost, status)
VALUES
  ('FI001', 'Alfalfa Hay', 'Forage', '5,000 kg', 'kg', '2023-10-15', 'Green Valley Farms', '$0.15/kg', 'In Stock'),
  ('FI002', 'Corn Silage', 'Forage', '8,200 kg', 'kg', '2023-11-02', 'Harvest Solutions', '$0.10/kg', 'In Stock'),
  ('FI003', 'Grain Mix', 'Concentrate', '2,800 kg', 'kg', '2023-12-10', 'Premium Feed Co.', '$0.40/kg', 'Low Stock'),
  ('FI004', 'Mineral Supplement', 'Supplement', '500 kg', 'kg', '2024-01-05', 'Animal Nutrition Inc.', '$1.25/kg', 'In Stock'),
  ('FI005', 'Protein Pellets', 'Supplement', '350 kg', 'kg', '2024-01-15', 'Premium Feed Co.', '$0.75/kg', 'Low Stock');

-- Insert sample tasks
INSERT INTO tasks (id, title, description, category, due_date, completed, priority)
VALUES
  ('T001', 'Feed new calves', 'Special nutrition mix for the new calves', 'feeding', '2023-11-15', FALSE, 'high'),
  ('T002', 'Vaccination for herd', 'Annual vaccination for the entire herd', 'health', '2023-11-20', FALSE, 'high'),
  ('T003', 'Monitor heat cycles', 'Check for signs of heat in breeding stock', 'breeding', '2023-11-10', FALSE, 'medium'),
  ('T004', 'Repair north fence', 'Fix the damaged section of the north pasture fence', 'general', '2023-11-25', FALSE, 'medium'),
  ('T005', 'Schedule vet visit', 'Routine checkup for pregnant cows', 'health', '2023-11-18', TRUE, 'high');

-- Insert sample financial transactions
INSERT INTO financial_transactions (id, date, description, category, amount, payment_method, status)
VALUES
  ('T001', '2023-11-05', 'Feed Purchase - Premium Feed Co.', 'Feed', -1250.00, 'Bank Transfer', 'completed'),
  ('T002', '2023-11-10', 'Milk Sales - Valley Dairy Processor', 'Sales', 3200.00, 'Check', 'completed'),
  ('T003', '2023-11-15', 'Veterinary Services - Dr. Johnson', 'Medical', -450.00, 'Credit Card', 'completed'),
  ('T004', '2023-11-20', 'Cattle Sale - 2 Heads', 'Sales', 2800.00, 'Bank Transfer', 'completed'),
  ('T005', '2023-11-25', 'Equipment Maintenance', 'Equipment', -350.00, 'Credit Card', 'completed'),
  ('T006', '2023-11-28', 'Farm Insurance Payment', 'Insurance', -520.00, 'Direct Debit', 'completed'),
  ('T007', '2023-12-01', 'Staff Wages', 'Labor', -1800.00, 'Bank Transfer', 'pending');

-- Add Row Level Security (RLS) policies
ALTER TABLE livestock ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE vaccination_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE feeding_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE feed_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_transactions ENABLE ROW LEVEL SECURITY;

-- Create policies that allow authenticated users to access their data
CREATE POLICY "Allow authenticated users to read livestock" 
  ON livestock FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to read health_records" 
  ON health_records FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to read vaccination_schedules" 
  ON vaccination_schedules FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to read feeding_schedules" 
  ON feeding_schedules FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to read feed_inventory" 
  ON feed_inventory FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to read tasks" 
  ON tasks FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to read financial_transactions" 
  ON financial_transactions FOR SELECT TO authenticated USING (true);

-- Add policies for insert, update, delete operations (simplified for this example)
CREATE POLICY "Allow authenticated users to insert livestock" 
  ON livestock FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update livestock" 
  ON livestock FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to delete livestock" 
  ON livestock FOR DELETE TO authenticated USING (true);

-- Similar policies for other tables...
