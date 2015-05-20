desc 'Run the web server'
task web: :environment do
  ENV['RACK_ENV'] = ENV['APP_ENV']
  unicorn_conf = { config_file: 'unicorn.rb' }
  app = Unicorn.builder('config.ru', unicorn_conf)
  Unicorn::HttpServer.new(app, Unicorn::Configurator::RACKUP[:options]).start.join
end
