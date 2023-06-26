import { useEffect } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Divider,
  Drawer,
  Typography,
  useMediaQuery,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { ChartBar as ChartBarIcon } from "../icons/chart-bar";
import { Cog as CogIcon } from "../icons/cog";
import { Lock as LockIcon } from "../icons/lock";
import { Selector as SelectorIcon } from "../icons/selector";
import { ShoppingBag as ShoppingBagIcon } from "../icons/shopping-bag";
import { User as UserIcon } from "../icons/user";
import GavelIcon from "@mui/icons-material/Gavel";
import { UserAdd as UserAddIcon } from "../icons/user-add";
import { Users as UsersIcon } from "../icons/users";
import { XCircle as XCircleIcon } from "../icons/x-circle";
import { Bell as BellIcon } from "../icons/bell";
import { Clock as ClockIcon } from "../icons/clock";
import { Menu as MenuIcon } from "../icons/menu";
import { Search as SearchIcon } from "../icons/search";
import { NavItem } from "./nav-item";

const items = [
  {
    href: "/contents",
    icon: <MenuIcon fontSize="small" />,
    title: "콘텐츠 관리",
  },
  {
    href: "/statistics",
    icon: <ChartBarIcon fontSize="small" />,
    title: "통계",
  },
  {
    href: "/users",
    icon: <UsersIcon fontSize="small" />,
    title: "회원 관리",
    children: [
      {
        href: "/users/userList",
        title: "회원정보조회",
      },
    ],
  },
  {
    href: "/admin",
    icon: <UserIcon fontSize="small" />,
    title: "관리자",
    children: [
      {
        href: "/admin/adminList",
        title: "관리자 계정 조회",
      },
      {
        href: "/admin/adminChangePw",
        title: "비밀번호 변경",
      },
      {
        href: "/admin/adminAcl",
        title: "메뉴 권한 관리",
      },
    ],
  },
  {
    href: "/calls",
    icon: <ClockIcon fontSize="small" />,
    title: "전화",
    children: [
      {
        href: "/calls/spamManage",
        title: "스팸번호 관리",
      },
    ],
  },
  {
    href: "/event",
    icon: <ShoppingBagIcon fontSize="small" />,
    title: "이벤트/광고 배너",
    children: [
      {
        href: "/events/eventList",
        title: "이벤트/광고 배너 조회",
      },
    ],
  },
  {
    href: "/notices",
    icon: <BellIcon fontSize="small" />,
    title: "공지사항 관리",
    children: [
      {
        href: "/notices/noticeList",
        title: "공지사항 조회",
      },
    ],
  },
  {
    href: "/freqna",
    icon: <SearchIcon fontSize="small" />,
    title: "자주하는 질문관리",
    children: [
      {
        href: "/freqna/freqnaList",
        title: "자주하는 질문관리",
      },
      {
        href: "/freqna/freqnaWrite",
        title: "자주하는 질문등록",
      },
    ],
  },
  {
    href: "/qna",
    icon: <SearchIcon fontSize="small" />,
    title: "1:1문의",
    children: [
      {
        href: "/qna/qnaList",
        title: "1:1문의 관리",
      },
    ],
  },
  {
    href: "/history",
    icon: <OpenInNewIcon fontSize="small" />,
    title: "작업 이력 관리",
    children: [
      {
        href: "/history/adminHistory",
        title: "관리자 작업 이력 조회",
      },
      {
        href: "/history/menuHistory",
        title: "메뉴 권한 이력 조회",
      },
      {
        href: "/history/privateHistory",
        title: "개인정보 취급 이력 조회",
      },
    ],
  },
  {
    href: "/push",
    icon: <CogIcon fontSize="small" />,
    title: "PUSH",
    children: [
      {
        href: "/push/pushSend",
        title: "PUSH 발송",
      },
      {
        href: "/push/pushList",
        title: "PUSH 관리",
      },
    ],
  },
  {
    href: "/terms",
    icon: <GavelIcon fontSize="small" />,
    title: "이용약관",
    children: [
      {
        href: "/terms/termsManagement",
        title: "이용약관 관리",
      },
    ],
  },
];

export const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div>
          <Box sx={{ p: 3, backgroundColor: "#fff", width: "100%" }}>
            <NextLink href="/" passHref>
              <a>
                <img src="/static/images/logo.png" width={"100%"} />
              </a>
            </NextLink>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: "#2D3748",
            my: 3,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
              children={item.children}
            />
          ))}
        </Box>
        <Divider sx={{ borderColor: "#2D3748" }} />
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
