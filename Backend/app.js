var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var signupRouter = require('./routes/Signup');
var loginRouter = require('./routes/Login');

var addcountyRouter = require('./routes/AddCountry')
var addlocationRouter = require('./routes/AddLocation')
var adddesignationsRouter = require('./routes/AddDesignations')
var addStatusRouter = require('./routes/AddStatus')

var postIntuitionRouter = require('./routes/PostIntuition')
var DashboardRouter = require('./routes/Dashboard')
var MyIntuitionRouter = require('./routes/MyIntuition')
var MyIntuition_UpdateRouter = require('./routes/MyIntuition_Update')
var EmployeeHeaderRouter = require('./routes/EmployeeHeader')
var FeedbackRouter = require('./routes/Feedback')
var SolutionRouter = require('./routes/Solution')
var ResetPasswordRouter = require('./routes/ResetPassword')
var ApprovedIntuitionsRouter = require('./routes/ApprovedIntuitions')
var PendingForApprovalsRouter = require('./routes/PendingForApprovals')
var IntuitionsImplementedRouter = require('./routes/IntuitionsImplemented')
var RewardedRouter = require('./routes/Rewarded')
var PendingToApproveRouter = require('./routes/PendingToApprove')
var ConnectionsRouter = require('./routes/Connections')
var EmployeesRouter = require('./routes/Employees')
var MyRejectedSolutionRouter = require('./routes/MyRejectedSolution')
var ApprovedIntuitionsByMgrRouter = require('./routes/ApprovedIntuitionsByMgr')
var ImplementedIntuitionsByMgrRouter = require('./routes/ImplementedIntuitionsByMgr')
var RejectedSolutionByMrgRouter = require('./routes/RejectedSolutionByMrg')
var RewardedByMrgRouter = require('./routes/RewardedByMrg')
var UserTrackerRouter = require('./routes/UserTracker')
var BioRouter = require('./routes/Bio')


var runsqlRouter = require('./routes/RunSQL')


var app = express();
app.use(cors({origin:"*"}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/Login', loginRouter);
app.use('/Signup', signupRouter);
app.use('/AddCountry', addcountyRouter);
app.use('/AddLocation', addlocationRouter);
app.use('/AddDesignations', adddesignationsRouter);
app.use('/AddStatus', addStatusRouter);
app.use('/PostIntuition', postIntuitionRouter);
app.use('/MyIntuition', MyIntuitionRouter);
app.use('/MyIntuition_Update', MyIntuition_UpdateRouter);
app.use('/Dashboard', DashboardRouter);
app.use('/EmployeeHeader', EmployeeHeaderRouter);
app.use('/Dashboard/Feedback', FeedbackRouter);
app.use('/Dashboard/Solution', SolutionRouter);
app.use('/Authentication/ResetPassword', ResetPasswordRouter);
app.use('/ApprovedIntuitions', ApprovedIntuitionsRouter);
app.use('/PendingForApprovals', PendingForApprovalsRouter);
app.use('/IntuitionsImplemented', IntuitionsImplementedRouter);
app.use('/PendingToApprove', PendingToApproveRouter);
app.use('/Rewarded', RewardedRouter);
app.use('/Connections', ConnectionsRouter);
app.use('/Employees', EmployeesRouter);
app.use('/MyRejectedSolution', MyRejectedSolutionRouter);
app.use('/ApprovedIntuitionsByMgr', ApprovedIntuitionsByMgrRouter);
app.use('/ImplementedIntuitionsByMgr', ImplementedIntuitionsByMgrRouter);
app.use('/RejectedSolutionByMrg', RejectedSolutionByMrgRouter);
app.use('/RewardedByMrg', RewardedByMrgRouter);
app.use('/UserTracker', UserTrackerRouter);
app.use('/Authentication/Bio', BioRouter);


app.use('/RunSQL', runsqlRouter);

module.exports = app;
