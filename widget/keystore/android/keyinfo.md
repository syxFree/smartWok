包名：
    
    com.zskj.smartwok
        
别名：
    
    zhanshu
    
密码：
    
    zhanshu829*
    
生成keystore：
    
    命令：
        keytool -genkey -alias zhanshu -keyalg RSA -validity 36500 -keystore android.keystore
    其他信息：
        CN=zhanshu, OU=zhanshu, O=zhanshu, L=shanghai, ST=shanghai, C=china
    密码：
        zhanshu829*

生成签名
    
    命令：keytool -list -v -keystore "C:\Users\Administrator\android.keystore"

    密钥库类型: JKS
    密钥库提供方: SUN
    
    您的密钥库包含 1 个条目
    
    别名: zhanshu
    创建日期: 2019-12-6
    条目类型: PrivateKeyEntry
    证书链长度: 1
    证书[1]:
    所有者: CN=zhanshu, OU=zhanshu, O=zhanshu, L=shanghai, ST=shanghai, C=china
    发布者: CN=zhanshu, OU=zhanshu, O=zhanshu, L=shanghai, ST=shanghai, C=china
    序列号: 2c7da5b3
    有效期为 Fri Dec 06 13:59:15 CST 2019 至 Sun Nov 12 13:59:15 CST 2119
    证书指纹:
             MD5:  3A:33:97:BC:8C:41:D3:F2:AE:2B:60:5B:58:4E:72:4C
             SHA1: 4B:67:17:4C:9F:AB:1E:E6:FB:CF:DA:8F:CD:2A:3D:EA:82:07:A0:90
             SHA256: 60:84:10:9E:A8:38:70:78:3E:81:51:B6:36:94:C7:94:EA:C3:A2:CD:49:DC:D4:DC:3D:95:16:84:47:FA:A7:CC
    签名算法名称: SHA256withRSA
    主体公共密钥算法: 2048 位 RSA 密钥
    版本: 3
    
    扩展:
    
    #1: ObjectId: 2.5.29.14 Criticality=false
    SubjectKeyIdentifier [
    KeyIdentifier [
    0000: B8 15 2C 5C C0 A3 D4 62   16 47 6D B6 A8 75 44 5A  ..,\...b.Gm..uDZ
    0010: C4 32 AE 54                                        .2.T
    ]
    ]
    
    
    
    *******************************************
    *******************************************
