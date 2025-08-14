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
        removeUserCourse: '/users/removeCourse'
    },
    homePage: '/api/homePage',
    problems: {
        getProblem: '/problems/getTodayProblem',
        runProblem: '/problems/runProblem' ,
        submitCode: '/problems/submitCode',
        codingProfile: '/problems/codingProfile',
        leaderboard: '/problems/leaderboard',
        getComments: '/problems/getComments',
    }
}
export default apiRoutes