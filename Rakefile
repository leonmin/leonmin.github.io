require 'time'
require 'yaml'
# Usage: rake post title="A Title" [date="2014-04-14"]
desc "Create a new post"
task :post do
	unless FileTest.directory?('./_posts')
			abort("rake aborted: '_posts' directory not found.")
	end
	title = ENV["title"] || "new-post"
	slug = title.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
	begin
		datetime = (ENV['date'] ? Time.parse(ENV['date']) : Time.now).strftime('%Y-%m-%d %H:%M:%S %z')
		date = datetime.split.first
	rescue Exception => e
		puts "Error: date format must be YYYY-MM-DD!"
		exit -1
	end
	filename = File.join('.', '_posts', "#{date}-#{slug}.md")
	if File.exist?(filename)
		abort("rake aborted: #{filename} already exists.")
	end
	
	puts "Creating new post: #{filename}"
	open(filename, 'w') do |post|
		post.puts "---"
		post.puts "layout: post"
		post.puts "title: \"#{title.gsub(/-/,' ')}\""
		post.puts "date: #{datetime}"
		post.puts "categories:"
		post.puts "---"
	end
end

# Usage: rake draft title="A Title"
desc "Create a new draft"
task :draft do
	unless FileTest.directory?('./_drafts')
		abort("rake aborted: '_drafts' directory not found.")
	end
	title = ENV["title"] || "new-post"
	slug = title.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
	filename = File.join('.', '_drafts', "#{slug}.md")
	if File.exist?(filename)
		abort("rake aborted: #{filename} already exists.")
	end
	
	puts "Creating new draft: #{filename}"
	open(filename, 'w') do |post|
		post.puts "---"
		post.puts "layout: post"
		post.puts "title: \"#{title.gsub(/-/,' ')}\""
		post.puts "date:"
		post.puts "categories:"
		post.puts "---"
	end
end

desc "Push to github"
task :push do
	puts "Pushing to `master' branch:"
	system "git push origin master"
	puts "`master' branch updated."
	puts

	puts "Building site...."
	system "bundle exec jekyll build"
	puts
	cd '_site' do
		puts "Pushing to `gh-pages' branch:"
		system "git add -A"
		system "git commit -m 'Update at #{Time.now.utc}'"
		system "git push origin gh-pages"
		puts "`gh-pages' branch updated."
	end
end

desc 'Deploy to ftp via git-ftp'
task :deploy do
	options = YAML.load_file('_ftp.yml')
	user = options['ftp_username']
	passwd = options['ftp_password']
	host = options['ftp_host'].chomp('/')
	port = options['ftp_port'] || 8010
	dir = options['ftp_dir'].start_with?('/') ? options['ftp_dir'][1..-1] :
options['ftp_dir']
	system "bundle exec jekyll build"
	puts
	cd '_site' do
		system "git add -A"
		system "git commit -m 'Update at #{Time.now.utc}'"
		puts
		system "git ftp push --user #{user} --passwd #{passwd} ftp://#{host}:#{port}/#{dir}"
	end
end