constants = Module.constants.select { |c| c.to_s.end_with? 'Controller' }.map(&Module.method(:const_get))
controllers = constants.select { |const| const.is_a?(Class) && (const < Sinatra::Base) }
run Rack::Cascade.new(controllers)
