import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Row,
  Section,
  Text,
} from "@react-email/components";

interface ContactEmailProps {
  readonly firstName: string;
  readonly brand: string;
  readonly email: string;
  readonly service: string;
  readonly message: string;
}

export default function ContactEmail({
  firstName,
  brand,
  email,
  service,
  message,
}: ContactEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Body style={{ fontFamily: "Arial, sans-serif", margin: 0, padding: 0 }}>
        <Container style={{ backgroundColor: "#0a0a0d", padding: "40px 20px" }}>
          {/* Header */}
          <Section style={{ marginBottom: "40px" }}>
            <Text
              style={{
                color: "#c9a96e",
                fontSize: "24px",
                fontWeight: "300",
                letterSpacing: "0.35em",
                margin: "0 0 20px 0",
              }}
            >
              VREW KRIYA
            </Text>
            <Text
              style={{
                color: "#f0e8d8",
                fontSize: "16px",
                margin: "0",
              }}
            >
              New Inquiry
            </Text>
          </Section>

          <Hr
            style={{
              borderColor: "#c9a96e",
              opacity: "0.18",
              margin: "20px 0",
            }}
          />

          {/* Content */}
          <Section style={{ marginBottom: "30px" }}>
            <Row style={{ marginBottom: "15px" }}>
              <Text style={{ color: "#a09080", fontSize: "12px", margin: "0" }}>
                FIRST NAME
              </Text>
              <Text
                style={{
                  color: "#f0e8d8",
                  fontSize: "14px",
                  margin: "5px 0 0 0",
                }}
              >
                {firstName}
              </Text>
            </Row>

            <Row style={{ marginBottom: "15px" }}>
              <Text style={{ color: "#a09080", fontSize: "12px", margin: "0" }}>
                BRAND
              </Text>
              <Text
                style={{
                  color: "#f0e8d8",
                  fontSize: "14px",
                  margin: "5px 0 0 0",
                }}
              >
                {brand}
              </Text>
            </Row>

            <Row style={{ marginBottom: "15px" }}>
              <Text style={{ color: "#a09080", fontSize: "12px", margin: "0" }}>
                EMAIL
              </Text>
              <Text
                style={{
                  color: "#f0e8d8",
                  fontSize: "14px",
                  margin: "5px 0 0 0",
                }}
              >
                {email}
              </Text>
            </Row>

            <Row style={{ marginBottom: "15px" }}>
              <Text style={{ color: "#a09080", fontSize: "12px", margin: "0" }}>
                SERVICE
              </Text>
              <Text
                style={{
                  color: "#f0e8d8",
                  fontSize: "14px",
                  margin: "5px 0 0 0",
                }}
              >
                {service}
              </Text>
            </Row>

            <Row style={{ marginBottom: "15px" }}>
              <Text style={{ color: "#a09080", fontSize: "12px", margin: "0" }}>
                MESSAGE
              </Text>
              <Text
                style={{
                  color: "#f0e8d8",
                  fontSize: "14px",
                  margin: "5px 0 0 0",
                  whiteSpace: "pre-wrap",
                }}
              >
                {message}
              </Text>
            </Row>
          </Section>

          <Hr
            style={{
              borderColor: "#c9a96e",
              opacity: "0.18",
              margin: "20px 0",
            }}
          />

          {/* Footer */}
          <Section>
            <Text
              style={{
                color: "#a09080",
                fontSize: "12px",
                textAlign: "center",
                margin: "0",
              }}
            >
              Vrew Kriya Studio — Mumbai
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
