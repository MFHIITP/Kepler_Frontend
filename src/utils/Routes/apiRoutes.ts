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
        tokenCheck: `/checktoken`,
    }
}
export default apiRoutes