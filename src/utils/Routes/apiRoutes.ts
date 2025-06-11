const apiRoutes = {
    teams: {
        teamInfo: {
            content: `/contentteam/getcontentteamdata`,
            core: `/coreteam/getcoreteamdata`,
            dev: `/devteam/getdevteamdata`,
            executive: `/executiveteam/getexecutiveteamdata`,
            pr: `/prteam/getprteamdat`,
            treasury: `/treasuryteam/gettreasuryteamdata`
        },
        teamUpdates: {
            contentAddition: `/contentteam/addcontentperson`,
            coreAddition: `/coreteam/addcoreperson`,
            devAddition: `/devteam/adddevperson`,
            executiveAddition: `/executiveteam/addexecutiveperson`,
            prAddition: `/prteam/addprperson`,
            treasuryAddition: `/treasuryteam/addtreasuryperson`
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
        postBooks: `/library/books/postBook`
    },
    imagePosting: `/talks/imagestore`,
    querySending: `/api/sendquery`,
    courses: {
        payment: {
            currentCourses: `/payment/getCurrentCourses`,
            appliedCourses: `/payment/applyCourses`,
            userInformation: `/payment/getUserInformation`
        }
    }
}
export default apiRoutes