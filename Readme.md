model_Name="Fan"
model_name="fan"
db_name="email_sign_up_app"
table_name="fans"


# ONLY EDIT ABOVE HERE...

# Styles
mkdir public
mkdir public/stylesheets
touch public/stylesheets/styles.css
echo -e "body{
  margin: 0px;
  padding: 0px;
}" > public/stylesheets/styles.css

mkdir public/javascripts
touch public/javascripts/scripts.js

echo "function init(){
  jQuery('#signup-form').on('submit', function(e){
    e.preventDefault();
    jQuery(this).find('input').text('');
    jQuery.ajax({
      url: '/$table_name',
      method: 'post',
      dataType: 'json',
      data: jQuery(this).serialize(),
      success: function(data){
        jQuery('#$model_name-list').prepend( jQuery('<li>').text( data.name ) );
      }
    });
  });
}

jQuery(document).ready(init);
" > public/javascripts/scripts.js


# Jquery
curl https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js > public/javascripts/jquery.js

# Model
mkdir models
touch models/$model_Name.rb
echo -e "class $model_Name < ActiveRecord::Base\nend" > models/$model_name.rb

# Migrations
touch migrations.sql
echo -e "CREATE DATABASE $db_name;\n" > migrations.sql
echo    "\c $db_name" >> migrations.sql
echo -e "CREATE TABLE $table_name (" >> migrations.sql
echo -e "  id SERIAL PRIMARY KEY," >> migrations.sql
echo -e "  name VARCHAR(255)," >> migrations.sql
echo -e "  email VARCHAR(255)" >> migrations.sql
echo -e ");\n" >> migrations.sql

psql -c "CREATE DATABASE $db_name;"
psql $db_name -c "CREATE TABLE $table_name(id SERIAL PRIMARY KEY, name VARCHAR(255),email VARCHAR(255));"

# Views!
mkdir views
touch views/index.erb
echo "<h2>Sign-Up you $model_name</h2>

<li>
  <form id='signup-form'>
    <input type='text' name='$model_name[name]' placeholder='...name'/>
    <input type='text' name='$model_name[email]' placeholder='...email'/>
    <input type='submit' value='Sign-Up'/>
  </form>
</li>

<ul id='$model_name-list'>
  <% @$table_name.each do |$model_name| %>
    <li><%= $model_name.name %></li>
  <% end %>
</ul>
" > views/index.erb

touch views/layout.erb

echo "<html lang='en'>
<head>
  <meta charset='UTF-8'>
  <title>$table_name</title>
  <link rel='stylesheet' href='/stylesheets/styles.css'>
</head>
<body>
  <%= yield %>
  <script src='/javascripts/jquery.js'></script>
  <script src='/javascripts/scripts.js'></script>
</body>
</html>" > views/layout.erb

# Gemfile!
touch Gemfile
echo -e "source 'https://rubygems.org'\n\ngem 'sinatra'\ngem 'sinatra-activerecord'\ngem 'pg'" > Gemfile

# Config!!!
touch config.ru
echo -e "require './app'\nrun Sinatra::Application" > config.ru

# APP!
touch app.rb

# Bundler!
echo -e "require 'bundler'\nBundler.require()\n" > app.rb

# Models!
echo -e "require './models/$model_name'\n" >> app.rb

# Connection!
echo -e "ActiveRecord::Base.establish_connection(" >> app.rb
echo -e "  adapter: 'postgresql'," >> app.rb
echo -e "  database: '$db_name'" >> app.rb
echo -e ")\n" >> app.rb

# Routes!
echo -e "get '/' do\n  @$table_name = $model_Name.all\n  erb :index\nend\n" >> app.rb
echo -e "get '/$table_name' do\n  content_type :json\n  $table_name = $model_Name.all\n  $table_name.to_json\nend\n" >> app.rb
echo -e "post '/$table_name' do\n  content_type :json\n  $model_name = $model_Name.create(params[:$model_name])\n  $model_name.to_json\nend" >> app.rb


# Launch!
bundle
bundle exec rackup
