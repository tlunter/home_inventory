class AddTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.string :name
    end

    create_table :items_tags do |t|
      t.integer :item_id
      t.integer :tag_id
    end
  end
end
