class TagController < BaseController
  helpers { include TagService }

  get '/tags/?' do
    list.to_json
  end

  get '/tag/:tag_id/items' do |tag_id|
    get_tag(tag_id).to_json(include: :items)
  end

  post '/tag/?' do
    body = parse_json(req_body)
    attributes = body.slice(*ATTRIBUTES)

    create(attributes).to_json
  end

  put '/tag/:tag_id/?' do |tag_id|
    body = parse_json(req_body)
    attributes = body.slice(*ATTRIBUTES)

    update(tag_id, attributes).to_json
  end

  post '/tag/:tag_id/item/:item_id' do |tag_id, item_id|
    tag(tag_id, item_id).to_json(include: :items)
  end
end

