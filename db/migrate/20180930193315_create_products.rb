class CreateProducts < ActiveRecord::Migration[5.2]
  def change
    create_table :products do |t|
      t.string :part_number
      t.integer :user_id
      t.string :branch_id
      t.decimal :part_price, :precision => 12, :scale => 2
      t.string :short_desc

      t.timestamps
    end
  end
end
