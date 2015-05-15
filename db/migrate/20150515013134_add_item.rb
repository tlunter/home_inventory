class AddItem < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.string :name
      t.string :unit
      t.decimal :amount
    end
  end
end
