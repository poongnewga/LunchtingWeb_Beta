function validatePostForm()
  {
    var a=document.forms["postForm"]["title"].value;
    var b=document.forms["postForm"]["content"].value;

    if (a==null || a=="")
    {
      alert("제목을 써주세요!");
      return false;
    } else if (b==null || b=="") {
      alert("내용을 써주세요!");
      return false;
    }
    return true;
  }
