module TagService
  ATTRIBUTES = %w(name)

  module_function

  def list(tag_id = nil)
    Tag.all
  end

  def create(attributes)
    wrap_active_record_errors do
      Tag.create!(attributes)
    end
  end

  def update(tag_id, attributes)
    wrap_active_record_errors do
      get_tag(tag_id).tap { |i| i.update_attributes!(attributes) }
    end
  end

  def tag(tag_id, item_id)
    wrap_active_record_errors do
      get_tag(tag_id).tap do |tag|
        item = ItemService.get_item(item_id)
        tag.items << item
        tag.save
      end
    end
  end

  def get_tag(tag_id)
    Tag.find_by(id: tag_id).tap do |tag|
      fail NoSuchObject, tag_id unless tag
    end
  end
end
