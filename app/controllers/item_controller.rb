class ItemController < BaseController
  helpers { include ItemService }

  get '/items/?' do
    list.to_json
  end

  get '/item/:item_id/tags' do |item_id|
    get_item(item_id).to_json(include: :tags)
  end

  post '/item/?' do
    body = parse_json(req_body)
    attributes = body.slice(*ATTRIBUTES)

    create(attributes).to_json
  end

  put '/item/:item_id/?' do |item_id|
    body = parse_json(req_body)
    attributes = body.slice(*ATTRIBUTES)

    update(item_id, attributes).to_json
  end

  post '/item/:item_id/tag/:tag_id/?' do |tag_id, item_id|
    tag(tag_id, item_id).to_json(include: :tags)
  end
end
