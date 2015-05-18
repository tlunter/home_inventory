module ItemService
  ATTRIBUTES = %w(name unit amount)

  module_function

  def list
    Item.all
  end

  def create(attributes)
    wrap_active_record_errors do
      Item.create!(attributes)
    end
  end

  def update(item_id, attributes)
    wrap_active_record_errors do
      get_item(item_id).tap { |i| i.update_attributes!(attributes) }
    end
  end

  def tag(tag_id, item_id)
    wrap_active_record_errors do
      get_item(item_id).tap do |item|
        tag = TagService.get_tag(tag_id)
        item.tags << tag
        item.save
      end
    end
  end

  def get_item(item_id)
    Item.find_by(id: item_id).tap do |item|
      fail NoSuchObject, item_id unless item
    end
  end
end
