import { auth, signOut } from "@/server/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const session = await auth();
  
  if (!session?.user) {
    redirect('/auth/signin');
  }

  const { user } = session;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Chào mừng trở lại!</p>
            </div>
            <form
              action={async () => {
                'use server';
                await signOut({ redirectTo: '/auth/signin' });
              }}
            >
              <Button variant="outline" type="submit">
                Đăng xuất
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* User Profile Card */}
          <Card className="p-6">
            <div className="flex items-center space-x-4 mb-6">
              <Avatar className="w-16 h-16">
                <img 
                  src={user.image || '/default-avatar.png'} 
                  alt={user.name || 'Avatar'} 
                  className="w-full h-full rounded-full object-cover"
                />
              </Avatar>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900">
                  {user.name || 'Người dùng'}
                </h2>
                <p className="text-gray-600">{user.email}</p>
                <div className="mt-2">
                  <Badge variant={user.role === 'ADMIN' ? 'default' : 'secondary'}>
                    {user.role || 'USER'}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">User ID</h3>
                  <p className="text-sm font-mono bg-gray-100 p-2 rounded break-all">
                    {user.id}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Email</h3>
                  <p className="text-sm text-gray-900">{user.email}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Tên hiển thị</h3>
                  <p className="text-sm text-gray-900">{user.name || 'Chưa cập nhật'}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Vai trò</h3>
                  <p className="text-sm text-gray-900">{user.role || 'USER'}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">1</div>
              <div className="text-sm text-gray-600">Phiên đăng nhập</div>
            </Card>
            
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {user.role === 'ADMIN' ? 'Có' : 'Không'}
              </div>
              <div className="text-sm text-gray-600">Quyền Admin</div>
            </Card>
            
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {new Date().toLocaleDateString('vi-VN')}
              </div>
              <div className="text-sm text-gray-600">Hôm nay</div>
            </Card>
          </div>

          {/* Additional Actions */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Hành động</h3>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" disabled>
                Chỉnh sửa hồ sơ
              </Button>
              <Button variant="outline" disabled>
                Thay đổi mật khẩu
              </Button>
              <Button variant="outline" disabled>
                Cài đặt bảo mật
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              * Các tính năng này sẽ được phát triển trong tương lai
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}