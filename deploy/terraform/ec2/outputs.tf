output "instance_id" {
  value       = aws_instance.this.id
  description = "EC2 instance id"
}

output "public_ip" {
  value = (var.allocate_eip && length(aws_eip.this) > 0) ? aws_eip.this[0].public_ip : aws_instance.this.public_ip
  description = "Public IP (Elastic IP if enabled)"
}

output "public_dns" {
  value       = aws_instance.this.public_dns
  description = "Public DNS name (may differ from EIP association)"
}

output "ssh_user" {
  value       = var.ssh_user
  description = "SSH username to use for GitHub Action"
}

