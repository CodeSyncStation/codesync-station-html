
'use client'

import axiosInstance from "@/lib/axios";
import isEditor from "@/utils/isEditor";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const page = () => {
  const [settingId, setSettingId] = useState(null);
  const [settings, setSettings] = useState({
    whatsapp: "",
    googleAnalytics: "",
    sslCommerz: [],
    vdoCipher: "",
  });
  const router = useRouter()
  const getSetting = async () => {
    try {
      const response = await axiosInstance.get("/settings");
      const data = response.data["hydra:member"][0];
      setSettingId(data.id);
      setSettings({
        whatsapp: data.whatsapp,
        googleAnalytics: data.googleAnalytics,
        sslCommerz: data.sslCommerz,
        vdoCipher: data.vdoCipher
      });
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getSetting();
    if(isEditor()){
      router.push('/admin-login')
      localStorage.removeItem('userData')
    }
  }, []);
  const submitUpdate = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (settingId) {
        response = await axiosInstance.patch(
          `/settings/${settingId}`,
          settings,
          { headers: { "Content-Type": "application/merge-patch+json" } }
        );
        const data = response.data;
        setSettings({
          whatsapp: data.whatsapp,
          googleAnalytics: data.googleAnalytics,
          sslCommerz: data.sslCommerz,
          vdoCipher: data.vdoCipher,
        });
        toast.success("Setting updated susscssfully");
      } else {
        response = await axiosInstance.post("/settings", settings);
        const data = response.data;
        setSettings({
          whatsapp: data.whatsapp,
          googleAnalytics: data.googleAnalytics,
          sslCommerz: data.sslCommerz,
          vdoCipher: data.vdoCipher,
        });
        toast.success('Setting created susscssfully');
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data & error.response.data.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error("An error occurred")
      }
    }
  };
  return isEditor() ? null : <div>
    <h5 className="setting-title">Settings</h5>
    <p className="setting-des">Setup your settings and necessary things here.</p>
    <div className="wrapper">
      <section className="best-selling-courses">
        <div
          className="table-wrapper d-flex flex-column"
          style={{ gap: "12px" }}
        >
          {/* <!-- Whatsapp setting --> */}
          <div className="section-top rounded">
            <div className="d-flex justify-content-between">
              <h3 className="title-main">WhatsApp Settings</h3>
            </div>
            <p className="des">Update whatsapp number</p>
            {/* <!-- search  --> */}
            <form
              className="flex-between gap-2 pb-3  flex-column w-100"
              onSubmit={submitUpdate}
            >
              <div className="input-box mt-3 flex-1 w-100 ">
                <input
                  id="email"
                  type="search"
                  placeholder="Enter whatsapp number"
                  className="form-control shadow-none w-100 shadow-none"
                  value={settings.whatsapp}
                  onChange={(e) =>
                    setSettings({ ...settings, whatsapp: e.target.value })
                  }
                />
              </div>
              <div className="d-flex justify-content-end pb-4 w-100 mt-3">
                <button className="btn-dashboard">Update Settings</button>
              </div>
            </form>
          </div>

          {/* <!-- Google  setting --> */}
          <div className="section-top rounded">
            <div className="d-flex justify-content-between">
              <h3 className="title-main">Google Settings</h3>
            </div>
            <p className="des">
              Google Analytics Tracking ID (ex. UA-000000-2
            </p>
            {/* <!-- search  --> */}
            <form
              className="flex-between gap-2 pb-3  flex-column w-100"
              onSubmit={submitUpdate}
            >
              <div className="input-box mt-3 flex-1 w-100 ">
                <input
                  id="email"
                  type="search"
                  placeholder="UA-000000-2"
                  className="form-control shadow-none w-100 shadow-none"
                  value={settings.googleAnalytics}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      googleAnalytics: e.target.value,
                    })
                  }
                />
              </div>
              <div className="d-flex justify-content-end pb-4 w-100 mt-3">
                <button className="btn-dashboard">Update Settings</button>
              </div>
            </form>
          </div>

          {/* <!-- ssl commerze  setting --> */}
          <div className="section-top rounded">
            <div className="d-flex justify-content-between">
              <h3 className="title-main">SSLCOMMERZ Settings</h3>
            </div>
            <p className="des">Live store ID</p>
            {/* <!-- search  --> */}
            <form
              className="d-flex gap-2 pb-3  flex-column w-100"
              onSubmit={submitUpdate}
            >
              <div className="input-box mt-3 flex-1 w-100 ">
                <input
                  id="email"
                  type="search"
                  placeholder="Live store ID"
                  className="form-control shadow-none w-100 shadow-none"
                  value={settings.sslCommerz[0]}
                  onChange={(e) => {
                    const newSslCommerz = [...settings.sslCommerz];
                    newSslCommerz[0] = e.target.value;
                    setSettings({ ...settings, sslCommerz: newSslCommerz });
                  }}
                />
              </div>
              <p className="des">Live store key</p>
              <div className="input-box mt-3 flex-1 w-100 ">
                <input
                  id="email"
                  type="search"
                  placeholder="Live store key"
                  className="form-control shadow-none w-100 shadow-none"
                  value={settings.sslCommerz[1]}
                  onChange={(e) => {
                    const newSslCommerz = [...settings.sslCommerz];
                    newSslCommerz[1] = e.target.value;
                    setSettings({ ...settings, sslCommerz: newSslCommerz });
                  }}
                />
              </div>
              <div className="d-flex justify-content-end pb-4 w-100 mt-3">
                <button className="btn-dashboard">Update Settings</button>
              </div>
            </form>
          </div>

          {/* <!-- Google  setting --> */}
          <div className="section-top rounded">
            <div className="d-flex justify-content-between">
              <h3 className="title-main">Vdocipher Settings</h3>
            </div>
            <p className="des">Api Key</p>
            {/* <!-- search  --> */}
            <form
              className="flex-between gap-2 pb-3  flex-column w-100"
              onSubmit={submitUpdate}
            >
              <div className="input-box mt-3 flex-1 w-100 ">
                <input
                  id="email"
                  type="text"
                  placeholder="Enter vdocipher api key"
                  className="form-control shadow-none w-100 shadow-none"
                  value={settings.vdoCipher}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      vdoCipher: e.target.value,
                    })
                  }
                />
              </div>
              <div className="d-flex justify-content-end pb-4 w-100 mt-3">
                <button className="btn-dashboard">Update Settings</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  </div>
};

export default page;
