class CreateUpdateCaches < ActiveRecord::Migration[5.0]
  def change
    create_table :update_caches do |t|
      t.integer :user_id
      t.integer :record_id
      t.string :record_type
      t.text :record_data
      t.boolean :is_delete

      t.timestamps
    end
  end
end
