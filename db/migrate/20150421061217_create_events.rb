class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :name
      t.text :description
      t.datetime :starts_at
      t.boolean :visibility
      t.boolean :registration
      t.boolean :reminders

      t.timestamps
    end
  end
end
