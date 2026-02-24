const apiRoutes = {
    teams: {
        teamInfo: {
            getTeam: `/team/getTeam`,
        },
        teamUpdates: {
            addPerson: `/team/addPerson`,
            deletePerson: `/team/deletePerson`
        },
    },
    auth: {
        register: {
            authRegister: `/users/authsignup`,
            signupRegister: `/users/signup`
        },
        login: {
            authLogin: `/login/authlogin`,
            signInLogin: `/login/direct_login`
        },
        logout: `/logout`,
        otpVerify: `/users/verifyOTP`,
        getNewAccessToken: `/authRefreshToken/newAccessToken`
    },
    chat: {
        groupChat: {
            getGroups: `/number/take`,
            addGroup: `/number/add`,
            removeGroup: `/number/remove`
        },
        groupMembers: {
            memberList: `/number/participant_list`,
        },
        Talk: {
            getPastChats: `/talks/getchat`,
            deleteMessage: `/talks/deletemessage`,
        }
    },
    user: {
        history: {
            userHistory: `/historyusers`
        },
        live: {
            liveUsers: `/liveusers`,
            numberOfUsers: `/users/usernumber`
        },
        updateProfile: `/users/update`,
        getProfile: '/users/getProfileDetails',
        removeProfile: `/removeprofile`
    },
    library: {
        getBooks: `/library/books/getBook`,
        postBooks: `/library/books/postBook`,
        getCourses: '/library/courses/getCourses',
        deleteBook: `/library/books/deleteBook`,
    },
    imagePosting: `/talks/imagestore`,
    querySending: `/api/sendquery`,
    courses: {
        payment: {
            currentCourses: `/payment/getCurrentCourses`,
            appliedCourses: `/payment/applyCourses`,
            userInformation: `/payment/getUserInformation`
        },
        referCode: {
            getReferCode: `/referCode/getReferCode`
        }
    },
    getAllCourses: '/users/getAllCourses',
    razorpay: {
        payment: {
            createOrder: '/razorpay/create-order',
            verifyPayment: '/razorpay/verify-order'
        }
    },
    admins: {
        userlist: '/users/admins',
        removeUser: '/users/deleteuser',
        getInformation: '/users/moreInformation',
        removeUserCourse: '/users/removeCourse',
        adminMoneyTracker: {
            getAllReferralMoneyApprovals: '/referralMoneyTracker/getAllMoneyTransfers',
            approveReferralMoney: '/referralMoneyTracker/confirmMoneyTransfer',
            checkAdminApproval: '/referralMoneyTracker/checkAdminAccess',
        },
        courseToStudentList: '/admins/courseToStudentList',
        loggedInStudentsWithoutPurchase: '/admins/getLoggedInStudentsWithoutPurchase',
        studentInformationFromCourseAndOrganization: "/admins/stuentInformationFromStudentCourseAndOrganization",
        studentDetailFromStudentData: '/admins/getStudentDetailsFromStudentData',
    },
    homePage: '/api/homePage',
    problems: {
        getProblem: '/problems/getTodayProblem',
        runProblem: '/problems/runProblem' ,
        submitCode: '/problems/submitCode',
        codingProfile: '/problems/codingProfile',
        leaderboard: '/problems/leaderboard',
        getComments: '/problems/getComments',
        getAllProblems: '/problems/getAllProblems'
    },
    connection: {
        getPersonalDetails: '/connections/getPersonalDetails',
        savePersonalDetails: '/connections/savePersonalDetails',
        acceptRejectConnectionRequest: '/connections/acceptRejectConnectionRequest',
        deleteConnectionRequest: '/connections/deleteConnectionRequest',
        getConnectionDetailsRequest: '/connections/getConnectionDetailsRequest',
        getPersonalConnections: 'connections/getPersonalConnections',   // important not to keep the leading slash
        sendConnectionRequest: '/connections/sendConnectionRequest',
        getConnectionSuggestions: 'connections/getConnectionSuggestions',  //important not to keep the leading slash
        getDetailsNewConnection: "/connections/getDetailsNewConnection",
        connectionChats: {
            getConnectionChats: "/connections/getConnectionChats",
            sendConnectionChats: "/connections/sendConnectionChats"
        }
    },
    referrals: {
        getPendingReferrals: '/referCode/getPendingReferrals',
        acceptRejectReferral: '/referCode/acceptRejectReferral',
        getAcceptedReferrals: 'referCode/getAcceptedReferrals',
        saveBankDetails: '/referCode/saveReferralBankDetails'
    },
    playlistData: {
        getCoursePlaylist: '/playlist/getCoursePlaylist',
    }
}
export default apiRoutes