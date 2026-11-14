import Header from "@/components/Header";
import TabBar from "@/components/TabBar";
import SearchSheet from "@/components/SearchSheet";
import ProfileSheet from "@/components/ProfileSheet";

export default function TabsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <TabBar />
      <SearchSheet />
      <ProfileSheet />
    </>
  );
}
