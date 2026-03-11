import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { useState } from "react";
import { Mail, Eye, EyeOff, Lock } from "lucide-react-native";
import { useAuthStore } from "@/store/auth.store";
import { LinearGradient } from "expo-linear-gradient";

const C = {
  black: "#111111",
  red: "#ff5a5f",
  white: "#f8f8ff",
  green: "#058c42",
};

export default function LoginPage() {
  const login = useAuthStore((state) => state.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Decorative blobs */}
        <View style={styles.blobTopRight} />
        <View style={styles.blobBottomLeft} />

        {/* Logo */}
        <View style={styles.logoWrap}>
          <View style={styles.logoBadge}>
            <Text style={styles.logoBadgeText}>CP</Text>
          </View>
          <Text style={styles.logoText}>
            Car<Text style={styles.logoRed}>Pool</Text>
          </Text>
          <Text style={styles.logoTagline}>Your daily ride, simplified.</Text>
        </View>

        {/* Welcome */}
        <View style={styles.welcomeWrap}>
          <Text style={styles.eyebrow}>WELCOME BACK</Text>
          <Text style={styles.title}>Sign In</Text>
          <View style={styles.redRule} />
          <Text style={styles.subtitle}>
            Please fill in your details to continue
          </Text>
        </View>

        {/* Inputs */}
        <View style={styles.inputGroup}>
          {/* Email */}
          <View style={styles.inputLabel}>
            <Text style={styles.inputLabelText}>EMAIL</Text>
          </View>
          <View style={styles.inputWrap}>
            <Mail color={"rgba(248,248,255,0.4)"} size={18} />
            <TextInput
              style={styles.input}
              placeholder="you@email.com"
              placeholderTextColor={"rgba(248,248,255,0.25)"}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* Password */}
          <View style={[styles.inputLabel, { marginTop: 16 }]}>
            <Text style={styles.inputLabelText}>PASSWORD</Text>
          </View>
          <View style={styles.inputWrap}>
            <Lock color={"rgba(248,248,255,0.4)"} size={18} />
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor={"rgba(248,248,255,0.25)"}
              secureTextEntry={!showPass}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPass(!showPass)}>
              {showPass ? (
                <EyeOff color={"rgba(248,248,255,0.4)"} size={18} />
              ) : (
                <Eye color={"rgba(248,248,255,0.4)"} size={18} />
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.forgotWrap}>
            <Text style={styles.forgotText}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

        {/* Buttons */}
        <View style={styles.btnGroup}>
          {/* Sign In — green solid */}
          <TouchableOpacity
            style={styles.btnSignIn}
            onPress={login}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={[C.green, "#046e34"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.btnGradient}
            >
              <Text style={styles.btnSignInText}>Sign In</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: C.black },

  container: {
    flexGrow: 1,
    backgroundColor: C.black,
    paddingHorizontal: 28,
    paddingTop: 72,
    paddingBottom: 48,
    justifyContent: "space-between",
    gap: 36,
  },

  // Blobs
  blobTopRight: {
    position: "absolute",
    top: -80,
    right: -80,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: C.red,
    opacity: 0.07,
  },
  blobBottomLeft: {
    position: "absolute",
    bottom: -60,
    left: -60,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: C.green,
    opacity: 0.07,
  },

  // Logo
  logoWrap: { alignItems: "flex-start", gap: 10 },
  logoBadge: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: C.red,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  logoBadgeText: {
    color: C.white,
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 1,
  },
  logoText: {
    fontSize: 38,
    color: C.white,
    fontWeight: "800",
    letterSpacing: -1,
  },
  logoRed: { color: C.red },
  logoTagline: {
    color: "rgba(248,248,255,0.35)",
    fontSize: 14,
    fontWeight: "500",
  },

  // Welcome
  welcomeWrap: { gap: 6 },
  eyebrow: { color: C.red, fontSize: 11, fontWeight: "800", letterSpacing: 3 },
  title: {
    color: C.white,
    fontSize: 40,
    fontWeight: "800",
    letterSpacing: -1.5,
    lineHeight: 44,
  },
  redRule: {
    height: 3,
    width: 36,
    backgroundColor: C.red,
    borderRadius: 2,
    marginTop: 4,
  },
  subtitle: {
    color: "rgba(248,248,255,0.38)",
    fontSize: 14,
    fontWeight: "500",
    marginTop: 6,
  },

  // Inputs
  inputGroup: { gap: 4 },
  inputLabel: { marginBottom: 8 },
  inputLabelText: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 2,
    color: "rgba(248,248,255,0.35)",
  },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.1)",
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
  },
  input: {
    flex: 1,
    color: C.white,
    fontSize: 16,
    fontWeight: "500",
  },
  forgotWrap: { alignItems: "flex-end", marginTop: 12 },
  forgotText: { color: C.red, fontSize: 13, fontWeight: "700" },

  // Buttons
  btnGroup: { gap: 16 },
  btnSignIn: {
    borderRadius: 18,
    overflow: "hidden",
    shadowColor: C.green,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  btnGradient: {
    height: 58,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
  },
  btnSignInText: {
    color: C.white,
    fontSize: 17,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  orRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  orLine: { flex: 1, height: 1, backgroundColor: "rgba(255,255,255,0.1)" },
  orText: { color: "rgba(248,248,255,0.3)", fontSize: 13, fontWeight: "600" },

  btnSignUp: {
    height: 58,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  btnSignUpText: {
    color: "rgba(248,248,255,0.7)",
    fontSize: 16,
    fontWeight: "700",
  },
});
