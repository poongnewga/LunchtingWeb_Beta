class PostMailer < ApplicationMailer
  def report_email(options={})
    @reporter_name = options[:reporter_name]
    @post_id = options[:post_id]
    @title = options[:title]
    @message = options[:message]
    mail(:to=>"help@lunchting.com", :subject=>"[런치팅] 게시물 신고 접수")
  end
end
