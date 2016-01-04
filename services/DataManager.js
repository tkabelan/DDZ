/* 
Service to download, merge and upload data to cloud 
*/
_servicesModule.factory('DataManager', function($q, $http, $state, $stateParams, $rootScope, FileService, localStorage, ArrayTransport, DatumPicker, $timeout, $window) {
    
    const keyImages = 'ddz.images';
    const keyTasks = 'ddz.tasks';
    const keyCompetenties = 'ddz.list.competenties';
    const keyQuestions = 'ddz.list.questions';
//    const keyFeedback = 'ddz.task.feedback';
	const keyStudentInfo = 'ddz.studentinfo';
	const keyWorkExp = 'ddz.workexp';
	const keyTeacherInfo = 'ddz.list.teachers';
	const keyToken = 'token';
    
    const keyDeleteID = 'ddz.deleteid';
    var deleteid = JSON.parse(window.localStorage[keyDeleteID] || '[]');
	 
    
    var images_details_array = [];
    var userid;

    var images = JSON.parse(window.localStorage[keyImages] || '{}');
    var tasks = JSON.parse(window.localStorage[keyTasks] || '[]');
    var competenties = JSON.parse(window.localStorage[keyCompetenties] || '[]');
    var selfreflecties = JSON.parse(window.localStorage[keyQuestions] || '[]');
//    var feedback = JSON.parse(window.localStorage[keyFeedback] || '[]');
	var teacherinfo = JSON.parse(window.localStorage[keyTeacherInfo] || '[]');
	//
	var studentinfo = JSON.parse(window.localStorage[keyStudentInfo] || '[]');
	var workexp = JSON.parse(window.localStorage[keyWorkExp] || '[]');
	
	var token = JSON.parse(window.sessionStorage[keyToken] || '{}');

    // for backward compatibility
    ArrayTransport.setOpdrachtArray(tasks);

    return {     

        taskImages: function(taskId) {
            var array = images[taskId];

            if(!array) {
                array = [];
                images[taskId] = array;
            }
            
            return array;
        },
		
		//KL
		getCompetencesObject: function() {
			return competenties;
		},
		
		getQuestionsObject: function() {
			return selfreflecties;
		},
		//

        tasks: function() {            
            return tasks;
        },
        
        task: function(id) {
            for (var index = 0; index < tasks.length; index++ ) {
                var task = tasks[index];
                
                if(task.id === id)
                    return task;
            }
        },
		
		studentinfo: function() {
			return studentinfo;
		},
		
		workexp: function() {
			return workexp;
		},
        
        deteleid: function() {
			return deteleid;
		},
		
		teacherinfo: function() {
			return teacherinfo;
		},
        
        images: function() {
            return images;
        },

/* - to delete- */
        opdracht: function(id) {
            for (var index = 0; index < tasks.length; index++ ) {
                var task = tasks[index];
                
                if(task.opdrachtID === id)
                    return task;
            }
        },
/* -- */

        competenties: function() {
            return angular.copy(competenties);
        },

        selfreflecties: function() {
            return angular.copy(selfreflecties);
        },

        feedback: function() {
            return angular.copy(feedback);
        },

        // save all changes to localStorage
        save: function() {
            localStorage.setObject(keyTasks, tasks);
//            localStorage.setObject(keyQuestions, selfreflecties);
//            localStorage.setObject(keyCompetenties, competenties);
//            localStorage.setObject(keyFeedback, feedback);
			localStorage.setObject(keyStudentInfo, studentinfo);
			localStorage.setObject(keyWorkExp, workexp);
			localStorage.setObject(keyTeacherInfo, teacherinfo);
            // TODO: @bossly, Images is not saved yet, because it contain base64 data.
            // we need to save url only.
            localStorage.setObject(keyImages, images);
        },


        setUserID : function(id){
            userid = id;

        },

        getUserID : function(){
            return  userid;
        },
		
        // CREATES AND FILLS LOCAL STORAGE FOR WORK EXPERIENCE
        loadWorkExp: function() {
            
            console.log("laad werkervaring");

            workExp = function(){
                 var urlworkexp = "https://ddzweb-app.mybluemix.net/api/students/me/workexperiences";
				
                 $http.get(urlworkexp, {
					 headers: {'Authorization': 'Bearer ' + token }
				 }).then(function(response, status){
                     var workexpinfo = response.data;;
                     console.log(workexpinfo);
                     var workexpObject = [];

                     for (var i = 0; i < workexpinfo.length; i++){
                         workexpObject[i] = {
                             _id: workexpinfo[i]._id,
                             companyname: workexpinfo[i].companyname,
                             description: workexpinfo[i].description,
                             startDate: workexpinfo[i].startDate,
                             endDate: workexpinfo[i].endDate
                         };
                     };
                     workexp = workexpObject;
                     localStorage.setObject(keyWorkExp, workexpObject);
					 console.log("RELOADING ISSUE, REENTER PAGE TO SEE WORKEXPERIENCES");
                 });
            };
                
            var localWorkExp = localStorage.getObject(keyWorkExp);
            console.log(localWorkExp.length);
			
            console.log("POSTING WORKEXP NEEDS TO BE CHANGED FOR NEW STACK");
//			if (localWorkExp.length !== 0) {
//				for (var i = 0; i < localWorkExp.length; i++) {
//					if (localWorkExp[i]._id === undefined) {
//						console.log("werkexp heeft geen id");
//						$http.post("https://ddzweb.mybluemix.net/api/students/" + userid + "/workexperiences/", { 
//							companyname: localWorkExp[i].companyname,
//							description: localWorkExp[i].description,
//							startDate: localWorkExp[i].startDate,
//                            endDate: localWorkExp[i].endDate
//						});
//						console.log("work experience put on cloud");
//	////                }
//					}
//				};
//			};
            
            $timeout(workExp, 1500);
//            workExp();
            
//            for (var i = 0; i < localWorkExp.length; i++) {
////                if (localWorkExp[i]._id !== "") {
////                    console.log("no id");
//                    
//                    $http.post("https://ddzweb.mybluemix.net/api/students/" + userid + "/workexperiences/", { 
////                        $http.delete("https://ddzweb.mybluemix.net/api/students/" + userid + "/tasks/" + localTasks[i].id, { 
//                        companyname: localWorkExp[i].companyname,
//                        description: localWorkExp[i].description,
//                    });
//                    console.log("work experience put on cloud");
////                }
//            }
            
//            $timeout(workExp, 1500);

        },
        
        // END OF WORK EXPERIENCE
		
		loadLocalStorages: function(){
			console.log(token);
		console.log("LOAD LOCAL STORAGES FROM DATAMANAGER");
			// THIS FUNCTION SHOULD EXECUTE ON THE FIRST TIME USING THE APP, AFTERWARDS WHEN sTUDENT LOGS IN (UNLESS THERE IS NO INTERNETCONNECTION)
			//CREATES AND FILLS LOCAL STORAGE FOR STUDENT INFO
			studentInfo = function() {
				var urlme = "https://ddzweb-app.mybluemix.net/api/students/me";
				$http.get(urlme, {
					headers: {'Authorization': 'Bearer ' + token }
				}).then(function(response, status){
					var student = response.data;
				console.log(student);

				studentInfoObject = ({
					_id: student._id,
					profile: student.profile,
                    mentor: student.mentor,
					birth: student.birth,
					telephone: student.telephone,
					email: student.email,
					studentID: student.studentID,
					description: student.description,
					groups: student.groups,
					recommendations: student.recommendations,
//					workexperiences: student.workexperiences,
					competences: student.competences,
					function: student.function,
					name: {
						last: student.name.last,
						first: student.name.first,
					},
				});
				
				studentinfo = studentInfoObject;
				localStorage.setObject(keyStudentInfo, studentInfoObject);
                localStorage.setObject(keyDeleteID, []);
				});
			}
			
			studentInfo();
			//END LOCAL STORAGE FOR STUDENT INFO
			
			// CREATES AND FILLS LOCAL STORAGE FOR "AVAILABLE" TEACHERS"
			teacherInfo = function() {
				var urlme = "https://ddzweb-app.mybluemix.net/api/students/me";
				$http.get(urlme, {
					headers: {'Authorization': 'Bearer ' + token }
				}).then(function(response, status){
					
					var student = response.data;
					var groupID = student.groups;
					var urlgroup = "https://ddzweb-app.mybluemix.net/api/groups/" + groupID + "/teachers";
					
					$http.get(urlgroup, {
						headers: {'Authorization': 'Bearer ' + token }
					}).then(function(response, status){
						var teachers = response.data;
						var teacherInfoObject = [];
						for (var i = 0; i < teachers.length; i++){

							teacherInfoObject[i] =
								{
								teacherID: teachers[i]._id,
								name: teachers[i].name.first + ' ' + teachers[i].name.last,
								firstname: teachers[i].name.first,
								lastname: teachers[i].name.last,
								};
							};
					teacherinfo = teacherInfoObject;
					localStorage.setObject(keyTeacherInfo, teacherInfoObject);
					});
				});
			};
			
			teacherInfo();
			//END LOCAL STORAGE FOR TEACHERS
			
			// CREATES AND FILLS LOCAL STORAGE FOR "AVAILABLE" COMPETENCES
			competences = function(){
				// Perhaps need to find an easier/better way to do this. Now first gets the student and then searches for the corresponding profile, and then loads the corresponding competences into the local storage.
				var urlme = "https://ddzweb-app.mybluemix.net/api/students/me";
				$http.get(urlme, {
					headers: {'Authorization': 'Bearer ' + token }
				}).then(function(response, status){
					var student = response.data;
					var profileID = student.profile._id;
					var urlprofile = "https://ddzweb-app.mybluemix.net/api/profiles/" + profileID;
					$http.get(urlprofile, {
						headers: {'Authorization': 'Bearer ' + token }
					}).then(function(response, status){
						var profileinfo = response.data;
						console.log(profileinfo);
						var competentiesObject = [];
						for (var i = 0; i < profileinfo.competences.length; i++){
							competentiesObject[i] = 
							{
							competence: profileinfo.competences[i]._id,
							name: profileinfo.competences[i].name,
							selected: 'false',
							explanation: '',
							checkboxValue: 'false',
							approved: false,
							feedback: '',
							};

						};
					competenties = competentiesObject;
					localStorage.setObject(keyCompetenties, competentiesObject);
					});
				});
			};
			
			competences();
			// END LOCAL STORAGE FOR COMPETENCES
			
            // CREATES AND FILLS IN THE LOCAL STORAGE FOR SELFREFLECTIONQUESTIONS. STILL NEEDS TO BE FIXED!!!
            selfreflectionQuestions = function(){
				var urlquestions = "https://ddzweb-app.mybluemix.net/api/selfreflections";
				
				$http.get(urlquestions, {
					headers: {'Authorization': 'Bearer ' + token }
				}).then(function(response, status){
					var questionInfo = response.data;
					var questionObject = [];
					for (var i = 0; i < questionInfo.length; i++){
						questionObject[i] =
							{
							question: questionInfo[i].question,
                    		selfreflection: questionInfo[i]._id,
							answer: '',
							approved: false,
//							description: questionInfo[i].description // wordt niet gebruikt nog.
                    		}
					}
				selfreflecties = questionObject;
                localStorage.setObject(keyQuestions, questionObject);
				});
            };
			
			selfreflectionQuestions();		
			// END LOCAL STORAGE FOR SELFREFLECTIONSQUESTIONS.

			// END OF LOADING/FILLING LOCAL STORAGES
			console.log("FINISHED LOADING LOCAL STORAGES");
			
		},

        // SYNC FUNCTION
        sync: function() {
            
            var defer = $q.defer();
            var urltasks = "https://ddzweb-app.mybluemix.net/api/students/me/tasks"; 
            var taskArray = [];
            var testObject = localStorage.getObject(keyTasks);
            
            console.log(testObject);
            
            for (var i = 0; i < testObject.length; i++) {
                
//                console.log((testObject[i].teacher).substring(1,25));
                if (testObject[i].id.length < 18) {
                        $http.post(urltasks, {
							name: testObject[i].opdrachtnaam, 
                            favorite: testObject[i].favoriet, 
//                          feedback: testObject[i].feedback, // Feedback comes from web, will never be pushed to cloud from app
                            selfreflections: testObject[i].selfreflecties,
						    competences: testObject[i].competenties,
							progress: testObject[i].voortgangWaarde,
							description: testObject[i].description,
							teacher: testObject[i].teacher.trim(),
						}, {headers: {'Authorization': 'Bearer ' + token }});
						
                        console.log("localstorage task added to mongoDB");
                }

				// KL TEST 8-7-2015
//				if (testObject[i].id.length > 18) {
//					//
//						var testcompetentie = [];
//						for (j = 0; j < testObject[i].competenties.length; j++){
//							testcompetentie[j] = {
//												competence: testObject[i].competenties[j].competence,
//												name: testObject[i].competenties[j].name,
//												explanation: testObject[i].competenties[j].explanation,
//												_id: testObject[i].competenties[j]._id,
//												checkboxValue: testObject[i].competenties[j].checkboxValue,
//												selected: testObject[i].competenties[j].selected,
//												
//												}
//						}
//
//					//
//                        $http.put("https://ddzweb.mybluemix.net/api/students/" + userid + "/tasks/" + testObject[i].id, {   
//											name: testObject[i].opdrachtnaam, 
//                                            favorite: testObject[i].favoriet, 
////                                            feedback: testObject[i].feedback, // Feedback comes from web, will never be pushed to cloud from app
//                                            selfreflections: testObject[i].selfreflecties,
//                                            competences: testcompetentie,
//                                            progress: testObject[i].voortgangWaarde,
//                                            description: testObject[i].description,
//                                        });
//                        console.log("tasks that already exist both on local and mongo put on mongo with possible changes");
////						console.log(testObject[i].competenties);
////						console.log(testcompetentie);
//                }
				// KL TEST 8-7-2015

				if (testObject[i].id.length > 18) {
                        $http.put("https://ddzweb-app.mybluemix.net/api/students/me/tasks/" + testObject[i].id, {
											name: testObject[i].opdrachtnaam, 
                                            favorite: testObject[i].favoriet, 
//                                            feedback: testObject[i].feedback, // Feedback comes from web, will never be pushed to cloud from app
                                            selfreflections: testObject[i].selfreflecties,
                                            competences: testObject[i].competenties,
                                            progress: testObject[i].voortgangWaarde,
                                            description: testObject[i].description,
//                                            teacher: testObject[i].teacher,
                                        }, {headers: {'Authorization': 'Bearer ' + token }});
                        console.log("tasks that already exist both on local and mongo put on mongo with possible changes");
                }
                
            }
            
             var deleteIDs = localStorage.getObject(keyDeleteID);
            
            if (deleteIDs !== []) {
                for (var i = 0; i < deleteIDs.length; i++) {
                    console.log("kan wel deleten");
                    console.log(deleteIDs);
                    console.log(token)
                    $http.delete("https://ddzweb-app.mybluemix.net/api/students/me/tasks/" + deleteIDs[i],  
                                 {headers: {'Authorization': 'Bearer ' + token }});
                    localStorage.setObject(keyDeleteID, []);
                    
                }

            }
            
            var getDataFromCloud = function () {
                $http.get(urltasks, {
						  headers: {'Authorization': 'Bearer ' + token }
					}).then(function(response, status){
                    var webTasks = response.data;
//                    console.log(webTasks);

                    var json = JSON.parse(JSON.stringify(webTasks));                       

                    for (i =0 ; i < json.length; i++){          

                        var taskDetails ={
                            id : json[i]._id,
                            opdrachtID: json[i]._id,
                            description: json[i].description,
                            favoriet: json[i].favorite,
                            opdrachtnaam: json[i].name,
                            student: json[i].student,
                            selfreflecties: json[i].selfreflections,
                            competenties: json[i].competences,
                            datuminput: json[i].date,
                            feedback: json[i].feedback,
                            voortgangWaarde: json[i].progress,
                            status: json[i].status,
                            contentid: "img/placeholder.png",
                            teacher: json[i].teacher
                        }

//                        localStorage.setObject(keyTasks, taskDetails);
                        console.log("cloud pushed into localstorage");
                        taskArray.push(taskDetails);
                        //console.log("task Array is (sync funtion): " + JSON.stringify(taskArray));                                 
                    }      

                    merge(taskArray);    
                    tasks = angular.copy(taskArray);   
//                    localStorage.setObject(keyDeleteID, []);
                    $window.location.reload();
                });
            };
            
            $timeout(getDataFromCloud, 1500);
            

            // 2. merge with local storage
            function merge(array) {
                // @oleg: replaced old data by new
                localStorage.setObject(keyTasks, array);
                defer.resolve(keyTasks);
                
                // for backward compatibility
                ArrayTransport.setOpdrachtArray(tasks);
            }
            
            // 3. upload changes to cloud
            // ..
            return defer.promise;

        }
		// END OF SYNC FUNCTION
    }
});