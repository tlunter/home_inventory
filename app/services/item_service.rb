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

  def remove_tag(item_id, tag_id)
    wrap_active_record_errors do
      get_item(item_id).tap do |item|
        if tag = item.tags.find { |t| t.id == tag_id.to_i }
          item.tags.delete(tag)
        end
      end
    end
  end

  def possible_tags(item_id, search_term)
    item = get_item(item_id)
    matched_tags = TagService.search(search_term)
    tags = matched_tags - item.tags
    puts "Item Tags: #{item.tags.inspect}"
    puts "Good Tags: #{tags.inspect}"

    tags.as_json
  end

  def get_item(item_id)
    Item.find_by(id: item_id).tap do |item|
      fail NoSuchObject, item_id unless item
    end
  end
end
