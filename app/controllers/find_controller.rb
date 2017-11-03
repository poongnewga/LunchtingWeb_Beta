class FindController < ApplicationController
  protect_from_forgery with: :exception
  def id_index
  end

  def password_index
  end

  def find_id
    user = User.find_by(email: params[:email])
    if user
      UserMailer.id_confirmation(user).deliver
      redirect_to '/'
    else
      flash[:notice] = '해당 메일을 찾을 수 없습니다. 고객센터로 문의해주세요.'
      redirect_to '/find/id_index'
    end
  end

  def find_password
    user = User.find_by(nickname: params[:nickname])
    if user
      UserMailer.password_confirmation(user).deliver
      user.password = '2k3alt'
      redirect_to '/'
    else
      flash[:notice] = '해당 메일을 찾을 수 없습니다. 고객센터로 문의해주세요.'
      redirect_to '/find/password_index'
    end
  end
end
