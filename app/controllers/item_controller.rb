class ItemController < BaseController
  helpers { include ItemService }

  get '/items/?' do
    list.to_json
  end

  get '/item/:item_id/tags/?' do |item_id|
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

  get '/item/:item_id/tag_search/?' do |item_id|
    possible_tags(item_id, params[:search_term]).to_json
  end

  post '/item/:item_id/tag/:tag_id/?' do |item_id, tag_id|
    tag(tag_id, item_id).to_json(include: :tags)
  end

  delete '/item/:item_id/tag/:tag_id/?' do |item_id, tag_id|
    remove_tag(item_id, tag_id).to_json(include: :tags)
  end
end
