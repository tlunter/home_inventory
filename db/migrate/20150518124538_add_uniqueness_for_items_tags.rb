class AddUniquenessForItemsTags < ActiveRecord::Migration
  def change
    add_index :items_tags, [:item_id, :tag_id], unique: true, name: 'unique_items_and_tags'
  end
end
