$(document).ready(function()
{
	//Browser Detection & redirect
	var url = "http://outdatedbrowser.com/en"; 
	/msie|trident/i.test(navigator.userAgent) ? document.location = url : null;
	


	
	//Obtain About blurb
	xhr("get",{"path":"/about/"},".about-container").done(function(json)
    { 
		var x="";
		
        x += "<h1 class='text-center'>"+json.title+"</h1>";
		x += "<hr><br>"
        x += "<p>"+json.description+"</p><br>";
		x += "<div class='row'><h1 class='col-lg-3 text-right'>\"</h1>"
        x += "<p class='col-lg-6'>"+json.quote+"</p>";
		x += "<h1 class='col-lg-3 text-left'>\"</h1></div>"
        x += "<p class='text-center orange'>-"+json.quoteAuthor+"</p>";
        $(".about-container").append(x);
    });
	
	//Obtain undergrad degree info
	xhr("get",{"path":"/degrees/undergraduate/"},".undergradContent").done(function(json) 
    { 
		$.each(json.undergraduate,function(i,item)
        {
			var x="";
			x += "<a href='#' class='col-lg-4 col-6 text-center degreeBtn' data-toggle='modal' data-target='#ugModal"+i+"'>";
            x += "<h2 class='title'>" + item.title + "</h2>";
            x += "<p class='description'>" + item.description + "</p>";
			x += "</a>";
			
			var itemLink ="";
			$.each(item.concentrations, function(i,item){
				itemLink += "<li>"+item+"</li>";
			});
			var targetModal = "ugModal"+i;
			var targetContent = ".undergradContent";
			addModal(item.title, itemLink, targetModal, targetContent);
			
            $(".undergradContent").append(x);
        });             
    });
	
	
	//Obtain grad degree info
	xhr("get",{"path":"/degrees/graduate/"},".gradContent").done(function(json) 
    {
		var total = $(json.graduate).length;
		$.each(json.graduate,function(i,item)
        {
			//if reached last of list, change format & break -- scalable
			if (i == total-1){
				var x="";
				x += "<div class='col-lg-12 col-6 text-center cert'>";
				x += "<hr><br><h2 class='title'> Graduate Advanced Certificates</h2>";
				
				$.each(item.availableCertificates,function(i,item){
					x += "<li class='description'>" + item + "</li>";
				});
				x += "</div>";
				$(".gradContent").append(x);
				return false;
			}
				
			var x="";
			//The base block that will open a pop-up when pressed
			x += "<a href='#' class='col-lg-4 col-6 text-center degreeBtn' data-toggle='modal' data-target='#gModal"+i+"'>";
            x += "<h2 class='title'>" + item.title + "</h2>";
            x += "<p class='description'>" + item.description + "</p>";
			x += "</a>";
			

			var itemLink ="";
			$.each(item.concentrations, function(i,item){
				itemLink += "<li>"+item+"</li>";
			});
			var targetModal = "gModal"+i;
			var targetContent = ".gradContent";
			addModal(item.title, itemLink, targetModal, targetContent);
			
            $(".gradContent").append(x);
        });             
    });
	
	//Obtain Minor info
	xhr("get",{"path":"/minors/"},".minors-wrapper").done(function(json) 
    {
		$.each(json.UgMinors,function(i,item)
        {
			var inputBody ="";
			$.each(item.courses,function(i,item){
				inputBody += "<li>"+item+"</li>";
			});
			
			addCard(item.title, ("minorModal"+i), ".minors-wrapper");
			addModal(item.title, inputBody, ("minorModal"+i), ".minors-wrapper");
        });
    });
	
	//Obtain Employment blurb & info
	xhr("get",{"path":"/employment/"},".employmentContent").done(function(json)
    { 
		var x="";
        var y="";
		var z="";
        x += "<h1 class='section-title text-center'>"+json.introduction.title+"</h1>";
		
		
		//loop each content
		$.each(json.introduction.content,function(i,item){
			x += "<h3 class='section-title text-center orange'>"+item.title+"</h5><hr>";
			x += "<div class='container'>"+item.description+"</div><br>";
		});
		
		x += "<div class='row'>";
		//loop each degree statistics
		$.each(json.degreeStatistics.statistics,function(i,item){
			x += "<div class='col-md statsCard'>";
			x += "<h5 class='text-center'>"+item.value+"</h5>";
			x += "<p>"+item.description+"<p>";
			x += "</div>";
		});
		x += "</div><br>";
		
		//loop each employer
		x += "<div class='container'>";
		x += "<h3 class='text-center'>"+json.employers.title+"</h3><hr><br>";
		x += "<div class='row'>";
		$.each(json.employers.employerNames,function(i,item){
			x += "<span class='col-md text-center orange'>"+item+"</span>";
		});
		x += "</div>";
		x += "</div>";
		
		//loop each career
		x += "<div class='container'>";
		x += "<h3 class='text-center'>"+json.careers.title+"</h3><hr><br>";
		x += "<div class='row'>";
		$.each(json.careers.careerNames,function(i,item){
			x += "<span class='col-md text-center orange'>"+item+"</span>";
		});
		x += "</div>";
		x += "<br><p class='text-center'>*Employers/Careers are randomly pulled from our recent graduates</p>";
		x += "</div>";
		
		
        $(".employmentContent").append(x);
		
		
		
		// Coop Table module
		z += "<div class='row'><button type='button' class='btn btn-lg btn-outline-secondary col-sm jobBtns' data-toggle='modal' data-target='#coopTable'>";
        z += json.coopTable.title;
		z += "</button>";
		
		var inputBody ="";
		inputBody += "<table id='coopTabler'>";
		inputBody += '<tr><td><h4>Employer</h4></td><td><h4>Degree</h4></td><td><h4>City</h4></td><td><h4>Term</h4></td></tr>';
		$.each(json.coopTable.coopInformation,function(i,item){
			inputBody += '<tr><td>'+item.employer+'</td><td>'+item.degree+'</td><td>'+item.city+'</td><td>'+item.term+'</td></tr>';
		});
		inputBody += "</table>";
		
		addModalxl(json.coopTable.title, inputBody, "coopTable", ".workTable");
		
		
		// Professional Table module
		
		z += "<button type='button' class='btn btn-lg btn-outline-secondary col-sm jobBtns' data-toggle='modal' data-target='#employmentTable'>";
        z += json.employmentTable.title;
		z += "</button></div>";
			

		var inputBody ="";
		inputBody += "<table id='employmentTabler'>";
		inputBody += "<tr><h4><td>Employer</td><td>Degree</td><td>City</td><td>Title</td><td>Start Date</td></h4></tr>";
		$.each(json.employmentTable.professionalEmploymentInformation,function(i,item){
			inputBody += '<tr><td>'+item.employer+'</td><td>'+item.degree+'</td><td>'+item.city+'</td><td>'+item.title+'</td><td>'+item.startDate+'</td></tr>';
		});
		inputBody += "</table>";
		addModalxl(json.employmentTable.title, inputBody, "employmentTable", ".workTable");
		
        $(".workTable").append(z, y);
    });
	
	//Obtain People info
	xhr("get",{"path":"/people/"},".peopleContent").done(function(json) 
    { 
		var x="";
        var y="";
		var z="";		
		
		x += "<div class='card-columns'>";
		$.each(json.faculty,function(i,item)
        {
			
			x += "<div class='card peopleCard' data-toggle='modal' data-target='#facultyModal"+i+"'>";
			x += "<div class='card-body'>";
            x += "<h2 class='card-title'>" + item.name + "</h2>";
            x += "<p class='card-text'>" + item.title + "</p>";
			x += "</div>";
			x += "</div>";
			
			//Opens the modal menu for each item on click
			x += "<div class='modal fade' id='facultyModal"+i+"' tabindex='-1' role='dialog' aria-labelledby='exampleModalLabel' aria-hidden='true'>";
			x += "<div class='modal-dialog' role='document'>";
			x += "<div class='modal-content'>";
			x += "<div class='modal-header'>";
			x += "<div class='modal-title' id='exampleModalLabel'><h3>"+item.name + "</h3> <h5>" +item.title+"</h5></div>";
			x += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
			x += "<span aria-hidden='true'>&times;</span>";
			x += "</button>"
			x += "</div>"
			x += "<div class='modal-body'>";
			x += "<img src='"+item.imagePath+"'>";
			x += "<li>Username: "+item.username+"</li>";
			x += "<li>Name: "+item.name+"</li>";
			x += "<li>Title: "+item.title+"</li>";
			x += "<li>Interest Areas: "+item.interestArea+"</li>";
			x += "<li>Office: "+item.office+"</li>";
			if(item.website != "")
				x += "<li>Website: <a href='"+item.website+"'>"+item.website+"</a></li>";
			x += "<li>Phone: "+item.phone+"</li>";
				x += "<li>Email: <a href='mailto:"+item.email+"'>"+item.email+"</a></li>";
			if(item.twitter != "")
				x += "<li>Twitter: <a href='https://twitter.com/"+item.twitter+"'>"+item.twitter+"</a></li>";
			if(item.facebook != "")
				x += "<li>Facebook: <a href='https://facebook.com/"+item.facebook+"'>"+item.facebook+"</a></li>";
			
			
			x += "</div>";
			x += "<div class='modal-footer'>";
			x += "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button>";
			x += "</div></div></div></div>";		
		});
		x += "</div>";
		
		
		y += "<div class='card-columns'>";
		$.each(json.staff,function(i,item)
        {
			y += "<div class='card peopleCard' data-toggle='modal' data-target='#staffModal"+i+"'>";
			y += "<div class='card-body'>";
            y += "<h2 class='card-title'>" + item.name + "</h2>";
            y += "<p class='card-text'>" + item.title + "</p>";
			y += "</div>";
			y += "</div>";
			
			//Opens the modal menu for each item on click
			y += "<div class='modal fade' id='staffModal"+i+"' tabindex='-1' role='dialog' aria-labelledby='exampleModalLabel' aria-hidden='true'>";
			y += "<div class='modal-dialog' role='document'>";
			y += "<div class='modal-content'>";
			y += "<div class='modal-header'>";
			y += "<div class='modal-title' id='exampleModalLabel'><h3>"+item.name + "</h3> <h5>" +item.title+"</h5></div>";
			y += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
			y += "<span aria-hidden='true'>&times;</span>";
			y += "</button>"
			y += "</div>"
			y += "<div class='modal-body'>";
			y += "<img src='"+item.imagePath+"'>";
			y += "<li>Username: "+item.username+"</li>";
			y += "<li>Name: "+item.name+"</li>";
			y += "<li>Title: "+item.title+"</li>";
			y += "<li>Interest Areas: "+item.interestArea+"</li>";
			y += "<li>Office: "+item.office+"</li>";
			if(item.website != "")
				y += "<li>Website: <a href='"+item.website+"'>"+item.website+"</a></li>";
			y += "<li>Phone: "+item.phone+"</li>";
				y += "<li>Email: <a href='mailto:"+item.email+"'>"+item.email+"</a></li>";
			if(item.twitter != "")
				y += "<li>Twitter: <a href='https://twitter.com/"+item.twitter+"'>"+item.twitter+"</a></li>";
			if(item.facebook != "")
				y += "<li>Facebook: <a href='https://facebook.com/"+item.facebook+"'>"+item.facebook+"</a></li>";
			
			y += "</div>";
			y += "<div class='modal-footer'>";
			y += "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button>";
			y += "</div></div></div></div>";			
        });
		y += "</div>";
		
		
		// Buttons to select staff or faculty
		z += "<h1 class='section-title white'>" + json.title + "</h1>";
		z += "<p class='section-description white'>" + json.subTitle + "</p>";
		
		var btns="";
		btns += "<div class='row'><button type='button' class='btn btn-lg btn-outline-primary col-sm facultyMode'>Faculty</button>";
		btns += "<button type='button' class='btn btn-lg btn-outline-primary col-sm staffMode'>Staff</button></div>";
		
		$(".peopleButton").append(z, btns);
		
		$(".peopleContent").append(x);
		$(".facultyMode").click(function(){			
			$(".peopleContent").empty();
			$(".peopleContent").append(x);
		});
		$(".staffMode").click(function(){
			$(".peopleContent").empty();
			$(".peopleContent").append(y);
		});
    });
	
	
	//Obtain research info
	xhr("get",{"path":"/research"},".researchAreaContent").done(function(json) 
    { 
		var x="";
        var y="";
		$.each(json.byInterestArea,function(i,item)
        {
			var inputBody ="";
			$.each(item.citations,function(i,item){
				inputBody += "<li>"+item+"</li>";
			});
			addCard(item.areaName, ("researchAModal"+i), ".researchAreaContent");
			addModalxl(item.areaName, inputBody, ("researchAModal"+i), ".researchAreaContent");
        });

		x = "";
		y = "";
		x += "<div class='card-columns card-columns-fac'>";
		
		//slice to remove the first panel with no pic
		var collection = json.byFaculty.slice(1);
		$.each(collection,function(i,item)
        {
			var imgPath ="";
			x += "<div class='card facCardx facCard"+i+"' data-toggle='modal' data-target='#researchFModal"+i+"'>";
			
			x += "<img class='card-img-top' src='http://ist.rit.edu/assets/img/people/"+item.username+".jpg' height='100%' width='100%' alt='Card image cap'>";
			
			x += "<div class='card-img-overlay'>";
			x += "<h5 class='card-title'>"+item.facultyName+"</h5>";
			x += "</div>";
			x += "</div>";
			
			var inputBody ="";
			$.each(item.citations,function(i,item){
				inputBody += "<li>"+item+"</li>";
			});
			addModalxl(item.facultyName, inputBody, ("researchFModal"+i), ".researchFacContent");
        }); 
		x += "</div>";
        $(".researchFacContent").append(x, y);	
    });
	
	
	//Obtain Resource info
	xhr("get",{"path":"/resources"},".resourcesCont").done(function(json) 
    { 
		var x="";
		x += "<div class='section-header'>";
		x += "<h2 class='white text-center'>"+json.title+"</h2>";
		x += "<p class='section-description'>"+json.subTitle+"</p><br>";
		x += "</div>";
		$(".resourcesCont").prepend(x);
		var inputBody ="";
		
		//Study Abroad Body
		inputBody += "<p class='section-description'>" + json.studyAbroad.description + "</p>";
		$.each(json.studyAbroad.places,function(i,item){
			inputBody += "<h4>"+item.nameOfPlace+"</h4>";
			inputBody += "<p>"+item.description+"</p>";
		});
		addCard(json.studyAbroad.title, "resSAModal", ".resourceCardTarget");
		addModalxl(json.studyAbroad.title, inputBody, "resSAModal", ".resourceCardTarget");
		var inputBody ="";
		
		//Student Services Body
		inputBody += "<h3>" + json.studentServices.academicAdvisors.title + "</h3>";
		inputBody += "<p class='section-description'>" + json.studentServices.academicAdvisors.description + "</p>";
		inputBody += "<h4><a href='" + json.studentServices.academicAdvisors.faq.contentHref + "'>" + json.studentServices.academicAdvisors.faq.title + "</a></h4>";
		inputBody += "<h3>"+json.studentServices.professonalAdvisors.title+"</h3>";
		$.each(json.studentServices.professonalAdvisors.advisorInformation,function(i,item){
			inputBody += "<li>"+item.name+ " (<a href='mailto:"+item.email+"'>"+ item.email +"</a>) " + item.department + "</li>";
		});
		inputBody += "<br><h3>"+json.studentServices.facultyAdvisors.title+"</h3>";
		inputBody += "<p class='section-description'>" + json.studentServices.facultyAdvisors.description + "</p>";
		inputBody += "<h3>"+json.studentServices.istMinorAdvising.title+"</h3>";
		$.each(json.studentServices.istMinorAdvising.minorAdvisorInformation,function(i,item){
			inputBody += "<li>"+item.advisor+ " (<a href='mailto:"+item.email+"'>"+ item.email +"</a>) " + item.title + "</li>";
		});
		addCard(json.studentServices.title, "resSSModal", ".resourceCardTarget");
		addModalxl(json.studentServices.title, inputBody, "resSSModal", ".resourceCardTarget");
		var inputBody ="";
		
		
		//Tutors Body
		inputBody += "<p class='section-description'>" + json.tutorsAndLabInformation.description + "</p>";
		inputBody += "<a href='"+ json.tutorsAndLabInformation.tutoringLabHoursLink +"'><h4>Tutoring Lab Hours</h4></a>"; 
		addCard(json.tutorsAndLabInformation.title, "resTUTModal", ".resourceCardTarget");
		addModal(json.tutorsAndLabInformation.title, inputBody, "resTUTModal", ".resourceCardTarget");
		var inputBody ="";
		
		//Student Ambassadors Body
		$.each(json.studentAmbassadors.subSectionContent,function(i,item){
			inputBody += "<h3>" + item.title + "</h3>";
			inputBody += "<p class='section-description'>" + item.description + "</p>";
			if (i == 0){
				inputBody += "<img src='"+ json.studentAmbassadors.ambassadorsImageSource+"' class='mx-auto d-block img-fluid'>";
			}
		});
		inputBody += "<h4><a href='" + json.studentAmbassadors.applicationFormLink + "'>Apply Now!</a></h4>";
		inputBody += "<p class='section-description'>" + json.studentAmbassadors.note + "</p>";
		addCard(json.studentAmbassadors.title, "resSAMModal", ".resourceCardTarget");
		addModalxl(json.studentAmbassadors.title, inputBody, "resSAMModal", ".resourceCardTarget");
		var inputBody ="";
		
		//Form body
		inputBody += "<h3>Undergraduate Forms</h3>";
		$.each(json.forms.undergraduateForms,function(i,item){
			inputBody += "<li><a href='" + item.href + "'>"+ item.formName +"</a></li>";
		});
		inputBody += "<br><h3>Graduate Forms</h3>";
		$.each(json.forms.graduateForms,function(i,item){
			inputBody += "<li><a href='" + item.href + "'>"+ item.formName +"</a></li>";
		});
		addCard("Forms", "resFORMModal", ".resourceCardTarget");
		addModal("Forms", inputBody, "resFORMModal", ".resourceCardTarget");
		var inputBody ="";
		
		//Coop Enrollment Body
		$.each(json.coopEnrollment.enrollmentInformationContent,function(i,item){
			inputBody += "<h3>"+ item.title +"</h3>";
			inputBody += "<p class='section-description'>" + item.description + "</p>";
		});
		inputBody += "<h4><a href='" + json.coopEnrollment.RITJobZoneGuidelink + "'>RIT JobZone Guide</a></h4>";
		addCard(json.coopEnrollment.title, "resCEModal", ".resourceCardTarget");
		addModalxl(json.coopEnrollment.title, inputBody, "resCEModal", ".resourceCardTarget");
    });
	
	//Obtain Footer info
	xhr("get",{"path":"/footer/"},".footerContainer").done(function(json) 
    {
		var x="";
		var y="";
		
		x += "<h3 class='section-title text-center orange'>"+ json.social.title +"</h3>";
		x += "<blockquote class='blockquote text-center white'><p>"+ json.social.tweet +"</p><footer class='blockquote-footer'>" + json.social.by + "</footer></blockquote>";
		
		x += "<br><div class='row text-center mx-auto d-block'>";
		x += "<a href='"+ json.social.facebook +"'<i class='fa fa-facebook fa-3x col-sm-2' aria-hidden='true'></i></a>";
		x += "<a href='"+ json.social.twitter +"'<i class='fa fa-twitter fa-3x col-sm-2' aria-hidden='true'></i></a>";
		x += "</div><br><br>";
		
		x += "<div class='row text-center'>";
		$.each(json.quickLinks,function(i,item)
        {
			x += "<h5 class='col-sm-3'><a href='"+ item.href +"'>"+item.title+"</a></h5>";
        });
		x += "</div>";
		x += "<div class='row text-center'>";
		x += "<h5 class='mx-auto text-center'><a href='' data-toggle='modal' data-target='#newsModal'>News</a></h5>";
		x += "<h5 class='mx-auto text-center'><a href='' data-toggle='modal' data-target='#contactModal'>Contact Form</a></h5>";
		
		x += "</div>";
		
		y += "<div class='container'>";
        y += "<div class='copyright'>";
        y += json.copyright.html;
		y += "</div>";
		y += "</div>";
		$(".footerContainer").append(x);
		$(".footerContainer").append(y);
    });
	
	xhr("get",{"path":"/news/"},".footerContainer").done(function(json)
	{
		var inputBody="";
		
		$.each(json.older,function(i,item)
		{
			inputBody += "<h3>"+ item.title +"</h3>";
			inputBody += "<h5>"+ item.date +"</h5>";
			inputBody += "<p class='section-description'>"+ item.description +"</p>";
		});
		addModalxl("News", inputBody, "newsModal", ".footerContainer");
		inputBody = "<iframe src='http://ist.rit.edu/api/contactForm/' height='600px' width='100%' frameBorder='0'>";
		addModalxl("Contact Form", inputBody, "contactModal", ".footerContainer");
	});
	
	function addCard(inputJ, targetModal, targetContent) {
			var x="";
			x += "<div class='card minorCard' data-toggle='modal' data-target='#"+targetModal+"'>";
			x += "<div class='card-body'>";
			x += "<h5 class='card-title'>"+inputJ+"</h5>";
			x += "</div>";
			x += "</div>";
			$(targetContent).append(x);
		}
	
	function addModal(inputTitle, inputBody, targetModal, targetContent) {
		
			var y="";
			y += "<div class='modal fade' id='"+targetModal+"' tabindex='-1' role='dialog' aria-labelledby='exampleModalLabel' aria-hidden='true'>";
			y += "<div class='modal-dialog' role='document'>";
			y += "<div class='modal-content'>";
			y += "<div class='modal-header'>";
			y += "<h5 class='modal-title' id='exampleModalLabel'>"+inputTitle+"</h5>";
			y += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
			y += "<span aria-hidden='true'>&times;</span>";
			y += "</button>"
			y += "</div>"
			y += "<div class='modal-body'>";
			y += "<div class='container'>";
			y += inputBody;
			y += "</div>";
			y += "</div>";
			y += "<div class='modal-footer'>";
			y += "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button>";
			y += "</div></div></div></div>";
			$(targetContent).append(y);
		}

	function addModalxl(inputTitle, inputBody, targetModal, targetContent) {
		
			var y="";
			y += "<div class='modal fade' id='"+targetModal+"' tabindex='-1' role='dialog' aria-labelledby='exampleModalLabel' aria-hidden='true'>";
			y += "<div class='modal-dialog modal-xl' role='document'>";
			y += "<div class='modal-content'>";
			y += "<div class='modal-header'>";
			y += "<h5 class='modal-title' id='exampleModalLabel'>"+inputTitle+"</h5>";
			y += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
			y += "<span aria-hidden='true'>&times;</span>";
			y += "</button>"
			y += "</div>"
			y += "<div class='modal-body'>";
			y += "<div class='container'>";
			y += inputBody;
			y += "</div>";
			y += "</div>";
			y += "<div class='modal-footer'>";
			y += "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button>";
			y += "</div></div></div></div>";
			$(targetContent).append(y);
		}

	$(".studentMap").contents().find("#StudentsMap").css("style", "width:100%;height:270px");
});


function xhr(getPost,d,id){
		return $.ajax({
			type: getPost,
			dataType:"json",
			data:d,
			cache:false,
			async:true,
			url:"proxy.php",
			beforeSend:function(){
			}
		}).always(function(){
			
		}).fail(function() {
			console.log("xhr retrival failed");
		});
}