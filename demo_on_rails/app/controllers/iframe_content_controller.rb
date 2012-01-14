class IframeContentController < ApplicationController
  layout 'iframe'

  def small
  end

  def medium
  end

  def large
  end

  def pic1
  end

  def pic2
  end

  def very_long
  end

  def form_1
  end
  
  def no_body_tag
    raise "TODO: implement view with no body and update js lib"
    render :layout => false
  end

end
