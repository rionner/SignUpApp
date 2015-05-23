require 'bundler'
Bundler.require()

require './models/fan'

ActiveRecord::Base.establish_connection(
  adapter: 'postgresql',
  database: 'email_sign_up_app'
)

get '/' do
  @fans = Fan.all
  erb :index
end

get '/fans' do
  content_type :json
  fans = Fan.all
  fans.to_json
end

post '/fans' do
  content_type :json
  fan = Fan.create(params[:fan])
  fan.to_json
end
