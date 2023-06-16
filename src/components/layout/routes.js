import { AssignmentCardTable } from '../../pages/AssignmentCardTable';
import { Assignments } from '../../pages/Assignments';
import { CancelAccount } from '../../pages/CancelAccount';
import { EditProjectDialog } from '../../pages/EditProjectDialog';
import { ForgotPassword } from '../../pages/ForgotPassword';
import { Home } from '../../pages/Home';
import { InvitePeople } from '../../pages/InvitePeople';
import { InviteViaEmail } from '../../pages/InviteViaEmail';
import { Login } from '../../pages/Login';
import { MyProfileSection } from '../../pages/MyProfileSection';
import { NotFound404Status } from '../../pages/NotFound404Status';
import { OutOfOffice } from '../../pages/OutOfOffice';
import { ProjectAccess } from '../../pages/ProjectAccess';
import { ProjectDashboard } from '../../pages/ProjectDashboard';
import { RenameAccount } from '../../pages/RenameAccount';
import { ResetPassword } from '../../pages/ResetPassword';
import { Roster } from '../../pages/Roster';
import { SetupPeopleAccess } from '../../pages/SetupPeopleAccess';
import { Signup } from '../../pages/Signup';
import { TaskBoard } from '../../pages/TaskBoard';
import { UserSignup } from '../../pages/UserSignup';
import { Administrators } from '../Adminland/Administrators';
import Adminland from '../Adminland/Adminland';
import { EditUser } from '../Adminland/EditUser';
import { PeopleAccess } from '../Adminland/PeopleAccess';
import { RemoveUser } from '../Adminland/RemoveUser';
import { Docs } from '../../pages/Docs';
import { Schedule } from '../../pages/Schedule';

export const routes = [
  //signup Flow start
  {
    route: '/login',
    Component: Login,
  },
  {
    route: '/signup',
    Component: Signup,
  },

  { route: '/my-profile', Component: MyProfileSection, isProtected: true },

  { route: '/user/signup/:token', Component: UserSignup },
  { route: '/forgot-password', Component: ForgotPassword },
  { route: '/reset-password/:token', Component: ResetPassword },
  //Signup Flow end

  //Home Page Flow start
  { route: '/invite', Component: InvitePeople, isProtected: true },
  { route: '/invite-person', Component: InviteViaEmail, isProtected: true },
  { route: '/project/:projectId', Component: ProjectDashboard, isProtected: true },
  { route: '/project/:id/docs-and-files', Component: Docs, isProtected: true },
  { route: '/project/:id/schedule', Component: Schedule, isProtected: true },
  { route: '/project/:id/task-board', Component: TaskBoard, isProtected: true },
  { route: '/project/:projectId/access/users/:userAccountType', Component: ProjectAccess, isProtected: true },
  { route: '/setup-people-access', Component: SetupPeopleAccess, isProtected: true },
  //Home Page Flow end

  // adminLand start
  { route: '/account', Component: Adminland, isProtected: true },
  { route: '/people-access', Component: PeopleAccess, isProtected: true },
  { route: '/administrators', Component: Administrators, isProtected: true },
  { route: '/edit-info', Component: EditUser, isProtected: true },
  { route: '/remove-user', Component: RemoveUser, isProtected: true },
  { route: '/rename-account', Component: RenameAccount, isProtected: true },
  { route: '/cancellation/new', Component: CancelAccount, isProtected: true },
  //Adminland end

  // header start
  { route: '/', Component: Home, isProtected: true },
  { route: '/home', Component: Home, isProtected: true },
  { route: '/roster', Component: Roster, isProtected: true },

  { route: '/assignments', Component: Assignments, isProtected: true },
  { route: '/assignments-card-table', Component: AssignmentCardTable, isProtected: true },

  { route: '/edit-project', Component: EditProjectDialog, isProtected: true },

  {
    route: '/*',
    Component: NotFound404Status,
    isProtected: true,
  },
  { route: '/my/out-of-office', Component: OutOfOffice, isProtected: true },
  // header end
];
