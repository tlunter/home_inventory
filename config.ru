class PublicRoute < Sinatra::Base
  get '*' do
    file = File.join("public", request.path)
    if File.exist?(file)
      File.read(file)
    else
      status 404
    end
  end
end

class AlwaysIndex < Sinatra::Base
  INDEX = File.read('public/index.html')
  get '*' do
    INDEX
  end
end

constants = Module.constants.select { |c| c.to_s.end_with? 'Controller' }.map(&Module.method(:const_get))
controllers = [PublicRoute] + constants.select { |const| const.is_a?(Class) && (const < Sinatra::Base) } + [AlwaysIndex]
run Rack::Cascade.new(controllers)
