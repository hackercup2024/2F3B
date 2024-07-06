import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";
import { ArrowRightIcon } from "lucide-react";
import { LogoutLink, getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { checkSession } from "@/app/teacher/dashboard/action";

const Navbar = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const isAdmin = user?.email === process.env.ADMIN_EMAIL;
  const session = await checkSession();
  return (
    <nav
      className="sticky inset-x-0 top-0 z-[100] h-14 w-full border-b border-gray-200 bg-white/75
        backdrop-blur-lg transition-all overflow-y-hidden"
    >
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="z-40 flex font-semibold">
            <img 
              className="max-h-56 object-scale-down"
              src="/icon_title.svg"
              alt="logo title"
            />
          </Link>

          <div className="flex h-full items-center space-x-2">
            {user ? (
              <>
                {!isAdmin ? (
                  <>
                    <div className={session ? 'hidden' : ''}>
                      <Link
                        href="/teacher/dashboard"
                        className={buttonVariants({
                          size: "sm",
                          variant: "ghost",
                        })}
                      >
                        Dashboard 
                      </Link>
                    </div>
                    <div className={!session ? 'hidden' : ''}>
                      <Link
                        href="/teacher/attendance"
                        className={buttonVariants({
                          size: "sm",
                          variant: "ghost",
                        })}
                      >
                        Attendance 
                      </Link>
                      <Link
                        href="/teacher/grouping"
                        className={buttonVariants({
                          size: "sm",
                          variant: "ghost",
                        })}
                      >
                        Group Randomizer 
                      </Link>
                      <Link
                        href="/teacher/recitation"
                        className={buttonVariants({
                          size: "sm",
                          variant: "ghost",
                        })}
                      >
                        Recitation Picker 
                      </Link>
                      <Link
                        href="/api/terminate"
                        className={buttonVariants({
                          size: "sm",
                          variant: "ghost",
                        })}
                      >
                        End Sesion 
                      </Link>
                    </div>
                    <Link
                      href="/api/auth/logout"
                      className={buttonVariants({
                        size: "sm",
                        variant: "ghost",
                      })}
                    >
                      Sign out
                    </Link>
                  </>                 
                ) : 
                <>
                  <Link
                    href="/admin/classes"
                    className={buttonVariants({
                      size: "sm",
                      variant: "ghost",
                    })}
                  >
                    Classes 
                  </Link>
                  <Link
                    href="/admin/subjects"
                    className={buttonVariants({
                      size: "sm",
                      variant: "ghost",
                    })}
                  >
                    Subjects
                  </Link>
                  <Link
                    href="/admin/teachers"
                    className={buttonVariants({
                      size: "sm",
                      variant: "ghost",
                    })}
                  >
                    Teachers 
                  </Link>
                  <LogoutLink className={buttonVariants({
                      size: "sm",
                      variant: "ghost",
                    })}>Log Out</LogoutLink>
                </>
                }
              </>
            ) : (
              <>
                <Link
                  href="/api/auth/register"
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  Sign Up
                </Link>
                <Link
                  href="/api/auth/login"
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
