// components
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{width: 1, height: 1}}/>;

const ICONS = {
  user: getIcon('ic_user'),
};

const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'General',
    items: [
      {title: 'Users', path: '/dashboard/users', icon: ICONS.user},
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
];

export default sidebarConfig;
