# This controller doesn't expose any routes, but is used as a base for the
# rest of the application's controllers.
class BaseController < Sinatra::Base
  set :raise_errors, false
  set :show_exceptions, false

  before { content_type :json }

  error do |err|
    case err
    when BadModelOptions, MalformedRequestError
      status 400
    when NoSuchObject
      status 404
    when ConflictingModelOptions
      status 409
    else
      status 500
    end

    { class: err.class.name, message: err.message }.to_json
  end

  def wrap_active_record_errors
    yield
  rescue ActiveRecord::UnknownAttributeError, ActiveRecord::RecordInvalid => ex
    raise BadModelOptions, ex
  rescue ActiveRecord::RecordNotUnique => ex
    raise ConflictingModelOptions, ex
  end

  def parse_json(body)
    JSON.parse(body)
  rescue JSON::JSONError => ex
    raise MalformedRequestError, ex
  end

  def req_body
    request.body.tap(&:rewind).read
  end
end
